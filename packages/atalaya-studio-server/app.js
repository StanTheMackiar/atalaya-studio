import express from "express";
import "./config/db.config.js";
import contactRouter from "./router/contact.routes.js";

process.loadEnvFile("./.env");

const PORT = process.env.PORT || 3010;
const app = express();

app.use(express.json());

app.use("/contact", contactRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;
