import mongoose from "mongoose";
import { config } from "dotenv";

config();

const connectDB = async ():Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('Database connected...');
    } catch (error) {
        console.error('Failed to connect database', error);
    }
}

export default connectDB;