import { Router } from "express";
import { getContactsController, getContactByIdContoller } from '../controllers/contacts.js';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const ContactsRouter = Router();

ContactsRouter.get('/contacts', ctrlWrapper(getContactsController));

ContactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactByIdContoller));

export default ContactsRouter;
