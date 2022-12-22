import { IncomingMessage, ServerResponse } from 'node:http';

export const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(`{'message': 'Hello'}`);
}
