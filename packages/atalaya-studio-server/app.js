import cors from "cors";
import express from "express";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(currentDirectory, ".env");

if (existsSync(envPath)) {
	process.loadEnvFile(envPath);
}

import { contactRouter, testimonialsRouter } from "./router/index.js";

const PORT = process.env.PORT || 3010;
const app = express();

const corsOptions = {
	origin: "*",
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "Accept"],
	optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

//Routes
app.use("/contact", contactRouter);
app.use("/testimonials", testimonialsRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
