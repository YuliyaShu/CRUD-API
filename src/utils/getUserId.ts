import { IncomingMessage } from 'node:http';

export const getUserId = (req: IncomingMessage) => {
    const lastPartOfRequest = req.url?.split('/').slice(-1).join('');
    return (lastPartOfRequest === 'users') ? '' : lastPartOfRequest;
}
