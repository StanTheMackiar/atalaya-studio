import { Router } from "express";
import { ContactService } from "../services/contact.service.js";

const service = new ContactService();
const contactRouter = Router();

contactRouter.post("/", (req, res) => {
	return service.createContactRequest(req, res);
});

contactRouter.get("/", (req, res) => {
	return service.getContactRequests(req, res);
});

export default contactRouter;
