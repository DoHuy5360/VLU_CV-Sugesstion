import express from "express";
import "dotenv/config";
import { Database } from "./services/database";
import { aiSuggestion } from "./services/aiGenerate";
// Khởi tạo ứng dụng Express
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Route mẫu
app.get("/", (req: any, res: any) => {
	res.send("Hello World!");
});


app.post("/ai", async (req: any, res: any) => {
	const {dataCV} = req.body
	const message = await aiSuggestion(JSON.stringify(dataCV))
	res.json({
		content: message.content
	});
});

// Khởi động server
export const db = new Database();
app.listen(port, async () => {
	// db.connection = await db.connectDB();
	console.log(`Server is listening on: http://localhost:${port}`);
});
