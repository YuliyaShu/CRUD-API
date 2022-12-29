import { IncomingMessage } from 'node:http';

export const getUserId = (req: IncomingMessage) => {
    try {
        const lastPartOfRequest = req.url?.split('/').slice(-1).join('');
        return (lastPartOfRequest === 'users') ? '' : lastPartOfRequest;
    } catch (error) {
        console.log('Something went wrong. Try one more time');
        console.error(error);
    }
}
