import { Message } from '../../domain/entities/message.js';
import { MessageRepository } from '../../application/interfaces/messageRepository.js';
import { Collection, Db } from 'mongodb';

export class MessageRepositoryMongo implements MessageRepository {
    private collection: Collection;

    constructor(db: Db) {
        this.collection = db.collection('messages');
    }

    async save(message: Message): Promise<void> {
        await this.collection.insertOne({
            content: message.content,
            timestamp: message.timestamp
        });
    }
}