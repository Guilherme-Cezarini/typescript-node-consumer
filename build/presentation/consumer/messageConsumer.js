import { Message } from '../../domain/entities/message.js';
export class SaveMessageUseCase {
    messageRepository;
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    async execute(content) {
        const message = new Message(content.phone_number, content.message, content.ompany_id, content.campaign_id, new Date());
        await this.messageRepository.save(message);
    }
}
