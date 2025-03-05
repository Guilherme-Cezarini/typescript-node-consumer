import { connectToDatabase } from './infrastructure/database/mongoConnection.js';
import { MessageRepositoryMongo } from './infrastructure/repositories/messageRepositoryMongo.js';
import { SaveMessageUseCase } from './application/useCases/saveMessageUseCase.js';
import { RabbitMQConsumer } from './infrastructure/messaging/rabbitMQConsumer.js';
import { config } from './config/env.js';
import { logger } from './utils/logger.js';

async function bootstrap() {
    try {
        const db = await connectToDatabase();
        const messageRepository = new MessageRepositoryMongo(db);
        const saveMessageUseCase = new SaveMessageUseCase(messageRepository);
        const rabbitMQConsumer = new RabbitMQConsumer(saveMessageUseCase);

        await rabbitMQConsumer.start();
    } catch (error) {
        logger.error('Failed to start application:', error);
        process.exit(1); // Encerra o processo em caso de erro crítico
    }
}

bootstrap();