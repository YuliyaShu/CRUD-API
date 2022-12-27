import { ServerResponse } from 'node:http';

export const sendResponse = (res: ServerResponse, code: number, message: string, body?: string | Buffer): void => {
    console.log(code)
    res.statusCode= code;
    res.statusMessage = message;
    res.write(body || message);
    res.end();
    console.log(message);
}
