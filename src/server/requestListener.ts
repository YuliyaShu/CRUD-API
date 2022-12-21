import { IncomingMessage, ServerResponse } from 'node:http';

export const requestListener = (req: IncomingMessage, res: ServerResponse) => {
 console.log(req, res);
}
