import mongoose from "mongoose";

export const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error("Warning: MONGO_URI is not set in environment variables! Please check your .env file.");
        return;
    }
    try {
        await mongoose.connect(mongoUri);
        console.log("DB Connected successfully!!!");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};