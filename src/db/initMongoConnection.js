import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export const initMongoConection = async () => {
    try {
        const user = getEnvVar('MONGODB_USER');
        const pwd = getEnvVar('MONGODB_PASSWORD');
        const urls = getEnvVar('MONGODB_URL');
        const db = getEnvVar('MONGODB_DB');

        await mongoose.connect(
            `mongodb+srv://${user}:${pwd}@${urls}/${db}?retryWrites=true&w=majority&appName=Cluster0`
        );

        console.log('Mongo connection successfully established!');
    } catch (e) {
        console.log('Error while setting up mongo connection', e);
        throw e;
    }
};














/*

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://lilyafunny21:<db_password>@cluster0.jnqhqiq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export const initMongoDbConection = async () => {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
};
initMongoDbConection().catch(console.dir);
*/
