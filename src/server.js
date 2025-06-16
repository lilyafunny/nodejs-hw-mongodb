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
        res.status(200).json({
            status: 200,
            message: 'Hello',
        });
    });

    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();

        res.status(200).json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts,
        });
    });

    app.get('/contacts/:contactId', async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        if (!contact) {
            res.status(404).json({
                status: 404,
                message: 'Contact not found'
            });
            return;
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });

    });

    app.use((req, res) => {
        res.status(404).json({
            status: 404,
            message: 'Not Found',
        });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong',
            error: err.message,
        });
    });

    const PORT = getEnvVar(ENV_VARS.PORT, 3000);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

};
