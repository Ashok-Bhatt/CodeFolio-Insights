import mongoose from 'mongoose';
import { MONGO_CONN, DB_NAME } from './env.config.js';

mongoose.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

mongoose.set('toObject', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(MONGO_CONN, {
            dbName: DB_NAME
        });
        console.log(`✅ MongoDB Connected! Host: ${connectionInstance.connection.host}`);
        console.log(`📂 Database in use: ${connectionInstance.connection.name}`);
    } catch (error) {
        console.log("❌ MongoDB Database Connection Error: ", error);
        process.exit(1);
    }
}

export {
    connectToDB,
}
