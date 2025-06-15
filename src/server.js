import express from 'express';
import { randomUUID } from 'node:crypto';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import { getAllContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
    const app = express();

    app.use(cors({
        origin: 'myproject.onrender.com',
    }),);
    app.use(pino(
        {
            transport: {
                target: 'pino-pretty',
            },
        }

    ),);

    app.use((req, res, next) => {
        req.id = randomUUID();
        next();
    });

    app.get('/', (req, res, next) => {
        res.json({
            message: 'Hello',
            id: req.id,
        });
    });

    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();

        res.status(200).json({
            message: 'Successfully found contacts!',
            data: contacts,
        });
    });

    app.get('/contacts/:contactId', async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        if (!contact) {
            res.status(400).json({
                message: 'Contact not found'
            });
            return;
        }

        res.status(200).json({
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });

    });

    app.use((error, req, res, next) => {
        res.json({
            errorMessage: error.message,
            id: req.id,
        });
    });

    app.use((req, res) => {
        res.status(404).json({
            message: 'Not Found',
            status: 404,
        });
    });

    const PORT = getEnvVar(ENV_VARS.PORT, 3000);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}
