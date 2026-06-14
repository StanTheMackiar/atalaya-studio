import { Router } from "express";
import { TestimonialsService } from "../services/testimonials.service.js";

const service = new TestimonialsService();
const testimonialsRouter = Router();

testimonialsRouter.post("/", (req, res) => {
	return service.createTestimonial(req, res);
});

testimonialsRouter.get("/", (req, res) => {
	return service.getTestimonials(req, res);
});

export default testimonialsRouter;
