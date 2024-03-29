import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export default async function connect() {
    const mongoServer = await MongoMemoryServer.create({
        instance: {
            launchTimeout: 30000,
        }
    });
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, { dbName: "testingDb"});
    console.log(`MongoDB successfully connected to ${mongoUri}`);
}