import amqp from 'amqplib';
import { config } from '../../config/env.js';
import { logger } from '../../utils/logger.js';
export class RabbitMQConsumer {
    saveMessageUseCase;
    queue;
    connection = null;
    channel = null;
    constructor(saveMessageUseCase) {
        this.saveMessageUseCase = saveMessageUseCase;
        this.queue = config.rabbitMQQueue;
    }
    async start() {
        try {
            const url = "amqp://" + process.env.RABBITMQ_USER + ":" + process.env.RABBITMQ_PASSWORD + "@" + process.env.RABBITMQ_URL;
            this.connection = await amqp.connect(url);
            // Cria um canal
            this.channel = await this.connection.createChannel();
            // Declara a fila (caso não exista)
            await this.channel.assertQueue(this.queue, { durable: true });
            logger.info('Consumer started and waiting for messages...');
            // Consome mensagens da fila
            this.channel.consume(this.queue, async (msg) => {
                if (msg !== null) {
                    try {
                        const content = msg.content.toString();
                        await this.saveMessageUseCase.execute(content);
                        // Marca a mensagem como lida (ack)
                        this.channel.ack(msg);
                        logger.info(`Message processed and acknowledged: ${content}`);
                    }
                    catch (error) {
                        logger.error(`Failed to process message: ${this.getErrorMessage(error)}`);
                        // Rejeita a mensagem em caso de erro (nack)
                        this.channel.nack(msg, false, true); // Requeue the message
                    }
                }
            });
        }
        catch (error) {
            logger.error(`Failed to start consumer: ${this.getErrorMessage(error)}}`);
            await this.reconnect();
        }
    }
    getErrorMessage(error) {
        if (error instanceof Error) {
            return error.message;
        }
        return String(error);
    }
    async reconnect() {
        logger.info('Attempting to reconnect in 5 seconds...');
        setTimeout(() => this.start(), 5000); // Tenta reconectar após 5 segundos
    }
    async close() {
        if (this.channel)
            await this.channel.close();
        if (this.connection)
            await this.connection.close();
        logger.info('Consumer connection closed.');
    }
}
