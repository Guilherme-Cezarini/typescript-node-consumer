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
            company_id: message.company_id,
            campaign_id: message.campaign_id,
            created_at: message.created_at,
            updated_at: message.updated_at
        });
    }
}