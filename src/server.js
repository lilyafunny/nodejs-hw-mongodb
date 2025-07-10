import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

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

    app.use(express.json());

    app.use(cookieParser());

    app.get('/', (req, res, next) => {
        res.json({
            status: 200,
            message: 'Hello',
        });
    });

    app.use(router);
    app.use(notFoundHandler);
    app.use(errorHandler);

    const PORT = getEnvVar(ENV_VARS.PORT, 3000);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    app.use('/uploads', express.static(UPLOAD_DIR));

};
