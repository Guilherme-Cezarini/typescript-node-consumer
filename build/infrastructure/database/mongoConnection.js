import { MongoClient } from 'mongodb';
import { config } from '../../config/env.js';
const uri = "mongodb://" + config.mongoDBUsername + ":" + config.mongoDBPassword + "@" + config.mongoDBUrl;
const client = new MongoClient(uri);
let db;
export async function connectToDatabase() {
    if (!db) {
        await client.connect();
        db = client.db(config.mondgoDBDatabase);
    }
    return db;
}
