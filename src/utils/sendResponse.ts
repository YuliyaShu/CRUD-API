import { ServerResponse } from 'node:http';
import { StatusCodes, StatusMessages } from '../server/consts.js';
import { createBuffer } from './createBuffer.js';

export const sendResponse = (res: ServerResponse, code: number, message: string, body?: Buffer): void => {
    try {
        const errorResponse = createBuffer({ code: code, message: message }, res)
        console.log(code);
        res.statusCode = code;
        res.statusMessage = message;
        res.write(body || errorResponse);
        res.end();
        console.log(message);
    } catch (error) {
        console.log('Something went wrong. Try one more time');
        console.error(error);
        sendResponse(res, StatusCodes.INTERNAL_SERVER, StatusMessages.INTERNAL_SERVER);
    }
}
