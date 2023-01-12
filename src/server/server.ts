import dotenv from 'dotenv';
import { createServer } from 'node:http';
import process from 'node:process';
import { requestListener } from './requestListener.js';

dotenv.config();

export const PORT = (() => {
    if (process.env.STATUS?.trim() === 'production') {
        return Number(process.env.PROD_PORT) || 4001;
    } else if (process.env.STATUS?.trim() === 'test') {
        return Number(process.env.TEST_PORT) || 4100;
    } else {
        return Number(process.env.DEV_PORT) || 4000;
    }
})

export const startServer = (PORT: number) => createServer(requestListener).listen(PORT, () => console.log(`Server is listening on ${PORT} port in ${process.env.STATUS} mode.`))