export const config = {

    mongoDBUsername: process.env.MONGO_DB_USERNAME || "",
    mongoDBPassword: process.env.MONGO_DB_PASSWORD || "",
    dbName: process.env.MONGO_DB_NAME || 'messageDB',
    rabbitMQUrl: process.env.RABBITMQ_URL || 'amqp://localhost',
    rabbitMQQueue: process.env.RABBITMQ_QUEUE || 'messages',
    rabbitMQUser: process.env.RABBITMQ_USER || "",
    rabbitMQPassword: process.env.RABBITMQ_PASSWORD || "",
    rabbitMQUrl: process.env.RABBITMQ_URL || ""

};
