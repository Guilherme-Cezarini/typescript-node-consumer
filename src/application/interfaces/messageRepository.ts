import { Message } from '../../domain/entities/message.js';

export interface MessageRepository {
    save(message: Message): Promise<void>;
}