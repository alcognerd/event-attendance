import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./db/connectDB.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import { connectRedis } from "./redis/redis.js";

dotenv.config();
const app = express();
app.use(
	cors({
		orgin: process.env.CLIENT_URL,
		credentials: true,
	})
);
app.use(express.json());
app.use("/api/attendance", attendanceRoutes);
app.get("/api/ping", (req, res) => {
	res.json({ message: "Hello from Vercel API!" });
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
	connectDB();
	connectRedis();
	console.log("Server running at port: " + process.env.PORT);
});
