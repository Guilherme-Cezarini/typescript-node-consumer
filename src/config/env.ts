import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    mongoDBUrl: process.env.MONGO_DB_URL || "",
    mongoDBUsername: process.env.MONGO_DB_USERNAME || "",
    mongoDBPassword: process.env.MONGO_DB_PASSWORD || "",
    mondgoDBDatabase: process.env.MONGO_DB_DATABASE || "",
    rabbitMQUrl: process.env.RABBITMQ_URL || 'amqp://localhost',
    rabbitMQQueue: process.env.RABBITMQ_QUEUE || 'messages',
    rabbitMQUser: process.env.RABBITMQ_USER || "",
    rabbitMQPassword: process.env.RABBITMQ_PASSWORD || "",

};
