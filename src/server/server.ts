import dotenv from 'dotenv';
import { createServer } from 'node:http';
import process from 'node:process';
import { requestListener } from './requestListener.js';

dotenv.config();

const PORT = (process.env.STATUS?.trim() === 'production')
    ? Number(process.env.PROD_PORT) || 4001
    : Number(process.env.DEV_PORT) || 4000;

export const startServer = () => createServer(requestListener).listen(PORT, () => console.log(`Server is listening on ${PORT} port in ${process.env.STATUS} mode.`))
