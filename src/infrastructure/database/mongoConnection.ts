import { MongoClient, Db } from 'mongodb';
import { config } from '../../config/env.js';

const uri = "mongodb://"+ config.mongoDBUsername+ ":" + config.mongoDBPassword + "@" + config.mongoDBUrl;
const client = new MongoClient(uri);

let db: Db;

export async function connectToDatabase(): Promise<Db> {
    if (!db) {
        await client.connect();
        db = client.db(config.mondgoDBDatabase);
    }
    return db;
}