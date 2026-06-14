import { Router } from "express";
import { ContactService } from "../services/contact.service.js";

const service = new ContactService();
const contactRouter = Router();

contactRouter.post("/", service.createContactRequest.bind(service));

export default contactRouter;
