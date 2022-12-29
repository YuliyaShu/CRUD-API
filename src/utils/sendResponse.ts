import { ServerResponse } from 'node:http';
import { createBuffer } from './createBuffer.js';

export const sendResponse = (res: ServerResponse, code: number, message: string, body?: Buffer): void => {
    const errorResponse = createBuffer({ code: code, message: message })
    console.log(code);
    res.statusCode = code;
    res.statusMessage = message;
    res.write(body || errorResponse);
    res.end();
    console.log(message);
}
