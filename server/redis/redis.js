import Redis from "redis";
import dotenv from "dotenv";
dotenv.config();

export const redisClient = Redis.createClient({
	url: process.env.NODE_ENV === "production" ? process.env.REDIS_URL : "redis://localhost:6379",
});

// Handle Redis errors
redisClient.on("error", (err) => console.log("❌ Redis Client Error:", err));

// Async function to connect to Redis
export const connectRedis = async () => {
	try {
		await redisClient.connect();
		console.log("✅ Redis connected successfully");
	} catch (error) {
		console.log("❌ Failed to connect to Redis:", error);
		process.exit(1); // Exit if Redis fails to connect
	}
};
