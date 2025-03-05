import amqp, { Channel, ChannelModel, Connection } from 'amqplib';
import { SaveMessageUseCase } from '../../application/useCases/saveMessageUseCase.js';
import { config } from '../../config/env.js';
import { logger } from '../../utils/logger.js';

export class RabbitMQConsumer {
    private queue: string;
    private connection: ChannelModel | null = null;
    private channel: Channel | null = null;

    constructor(private saveMessageUseCase: SaveMessageUseCase) {
        this.queue = config.rabbitMQQueue;
    }

    async start(): Promise<void> {
        try {
            const url = "amqp://" + process.env.RABBITMQ_USER + ":" + process.env.RABBITMQ_PASSWORD + "@" + process.env.RABBITMQ_URL;
            this.connection = await amqp.connect(url);

            this.channel = await this.connection.createChannel();

            await this.channel.checkQueue(this.queue);

            logger.info('Consumer started and waiting for messages...');
            this.channel.consume(this.queue, async (msg) => {
                if (msg !== null) {
                    try {
                        const content = JSON.parse(msg.content.toString());
                        
                        await this.saveMessageUseCase.execute(content);
                        
                        this.channel!.ack(msg);
                        logger.info(`Message processed and acknowledged: ${JSON.stringify(content)}`);
                    } catch (error) {
                        logger.error(`Failed to process message: ${this.getErrorMessage(error)}`);
                        this.channel!.nack(msg, false, true); 
                    }
                }
            });
        } catch (error) {
            logger.error(`Failed to start consumer: ${this.getErrorMessage(error)}}`);
            await this.reconnect();
        }
    }

    getErrorMessage(error: unknown): string {
        if (error instanceof Error) {
            return error.message;
        }
        return String(error);
    }

    private async reconnect(): Promise<void> {
        logger.info('Attempting to reconnect in 5 seconds...');
        setTimeout(() => this.start(), 5000);
    }

    async close(): Promise<void> {
        if (this.channel) await this.channel.close();
        if (this.connection) await this.connection.close();
        logger.info('Consumer connection closed.');
    }
}