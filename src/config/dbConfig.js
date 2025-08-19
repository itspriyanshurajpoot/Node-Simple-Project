import mongoose from "mongoose";
import { DB_URL } from "./allConfig.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL)
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
};

// Export the connection for use in other files
export default mongoose.connection;