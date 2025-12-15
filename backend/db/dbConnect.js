import mongoose from "mongoose";
import dotenv from 'dotenv';

// Load environment variables immediately
dotenv.config();

// Destructure the URI for cleaner access and immediate check
const MONGODB_URI = process.env.MONGODB_URI;

/**
 * @description Attempts to establish a connection to the MongoDB database.
 * @returns {Promise<void>}
 */
const connectToDB = async () => {
    // 1. Critical Check: Ensure the URI is defined
    if (!MONGODB_URI) {
        console.error("❌ Fatal Error: MONGODB_URI is not defined in environment variables.");
        // Exiting the process is often preferred for critical failures like this
        process.exit(1); 
    }

    try {
        // 2. Connection Attempt
        await mongoose.connect(MONGODB_URI);

        // 3. Success Logging
        console.log("✅ Database Connected Successfully!");

    } catch (error) {
        // 4. Detailed Error Logging
        console.error("🔥 DB Connection Error:", error.message);
        
        // Optionally, print the full stack trace for debugging
        // console.error(error); 
        
        // 5. Exit on failure (recommended for server startup)
        process.exit(1); 
    }
}

export default connectToDB;