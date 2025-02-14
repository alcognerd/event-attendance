import express from "express";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import cors from "cors";
import { connectRedis } from "./redis/redis.js";

dotenv.config();
const app = express();
app.use(
	cors({
		orgin: [process.env.CLIENT_URL, "*"],
		credentials: true,
	})
);
app.use(express.json());

app.use("/attendance", attendanceRoutes);

app.listen(process.env.PORT || 5000, () => {
	connectDB();
	connectRedis();
	console.log("Server running at port: " + process.env.PORT);
});
