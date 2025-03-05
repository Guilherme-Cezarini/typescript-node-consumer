export class MessageRepositoryMongo {
    collection;
    constructor(db) {
        this.collection = db.collection('messages');
    }
    async save(message) {
        await this.collection.insertOne({
            content: message.content,
            timestamp: message.timestamp
        });
    }
}
