import { ServerResponse } from 'node:http';
import { createBuffer } from './createBuffer.js';

export const sendResponse = (res: ServerResponse, code: number, message: string, body?: Buffer): void => {
    try {
        const errorResponse = createBuffer({ code: code, message: message })
        console.log(code);
        res.statusCode = code;
        res.statusMessage = message;
        res.write(body || errorResponse);
        res.end();
        console.log(message);
    } catch (error) {
        console.log('Something went wrong. Try one more time');
        console.error(error);
    }
}
