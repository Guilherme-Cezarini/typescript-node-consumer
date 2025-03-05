import { Message } from '../../domain/entities/message.js';
import { MessageRepository } from '../interfaces/messageRepository.js';

export class SaveMessageUseCase {
    constructor(private readonly messageRepository: MessageRepository) {}

    async execute(
        content: any,
    ): Promise<void> {
        const message = new Message(content.phone_number, content.message, content.company_id, content.campaign_id, new Date(content.created_at), new Date(content.updated_at));
        await this.messageRepository.save(message);
    }
}