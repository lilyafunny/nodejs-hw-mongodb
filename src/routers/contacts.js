import { Router } from "express";
import { getContactsController, getContactByIdContoller, createStudentController, deleteContactController, patchContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const ContactsRouter = Router();

ContactsRouter.get('/contacts', ctrlWrapper(getContactsController));

ContactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactByIdContoller));

ContactsRouter.post('/contacts', ctrlWrapper(createStudentController));

ContactsRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

ContactsRouter.delete('/contacts/:contactId', ctrlWrapper(patchContactController));

export default ContactsRouter;
