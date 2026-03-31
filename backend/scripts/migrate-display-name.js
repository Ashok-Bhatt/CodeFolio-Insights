import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
import User from '../src/models/user.model.js';

dotenv.config();

const MONGO_CONN = process.env.MONGO_CONN;
const DB_NAME = process.env.DB_NAME;

if (!MONGO_CONN) {
    console.error('MONGO_CONN is not defined in .env file');
    process.exit(1);
}

const migrate = async () => {
    try {
        await mongoose.connect(MONGO_CONN, {
            dbName: DB_NAME
        });
        console.log('Connected to MongoDB');

        const usersWithoutDisplayName = await User.find({
            $or: [
                { displayName: { $exists: false } },
                { displayName: null },
                { displayName: '' }
            ]
        });

        console.log(`Found ${usersWithoutDisplayName.length} users without displayName`);

        for (const user of usersWithoutDisplayName) {
            user.displayName = uuid();
            try {
                await user.save({ validateBeforeSave: false });
                console.log(`Updated user ${user._id} with displayName: ${user.displayName}`);
            } catch (saveError) {
                console.error(`Failed to save user ${user._id}:`, saveError.message);
                if (saveError.errors) {
                    Object.keys(saveError.errors).forEach(key => {
                        console.error(`  Validation error for ${key}: ${saveError.errors[key].message}`);
                    });
                }
            }
        }

        console.log('Migration completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrate();
