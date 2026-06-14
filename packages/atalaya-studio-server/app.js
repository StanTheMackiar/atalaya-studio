import cors from "cors";
import express from "express";

import "./config/db.config.js";

process.loadEnvFile("./.env");

import { contactRouter, testimonialsRouter } from "./router/index.js";

const PORT = process.env.PORT || 3010;
const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/contact", contactRouter);
app.use("/testimonials", testimonialsRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
