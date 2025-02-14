import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import { connectRedis } from "./redis/redis.js";
import { logger } from "./utils/logger.js";

dotenv.config();
const app = express();
app.use(
	cors({
		orgin: process.env.CLIENT_URL,
		credentials: true,
	})
);
app.use(express.json());
app.use("/attendance", attendanceRoutes);
app.get("/ping", (req, res) => {
	res.json({ message: "Hello from Vercel API!" });
});
app.get("/", (req, res) => {
	res.send("Backend running fine...");
});

connectDB()
	.then((conn) => {
		app.listen(process.env.PORT || 5000, () => {
			connectRedis();
			logger.info("Server running ");
		});
		console.log("server connected to :" + conn.connection.host);
	})
	.catch((error) => {
		console.log(error);
	});

/* app.listen(process.env.PORT || 5000, () => {
	connectDB();
	connectRedis();
	logger.info("Server running ");
}); */
