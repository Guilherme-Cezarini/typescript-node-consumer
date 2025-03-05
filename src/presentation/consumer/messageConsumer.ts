import { Message } from '../../domain/entities/message.js';
import { MessageRepository } from '../../application/interfaces/messageRepository.js';

export class SaveMessageUseCase {
    constructor(private readonly messageRepository: MessageRepository) {}

    async execute(content: any): Promise<void> {
        
        const message = new Message(content.phone_number, content.message, content.ompany_id, content.campaign_id, new Date());
        await this.messageRepository.save(message);
    }
}