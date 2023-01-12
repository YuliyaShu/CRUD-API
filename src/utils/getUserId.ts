import { ServerResponse } from 'http';
import { IncomingMessage } from 'node:http';
import { StatusCodes, StatusMessages } from '../server/consts.js';
import { sendResponse } from './sendResponse.js';

export const getUserId = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    try {
        const lastPartOfRequest = req.url?.split('/').slice(-1).join('');
        return (lastPartOfRequest === 'users') ? '' : lastPartOfRequest;
    } catch (error) {
        console.log('Something went wrong. Try one more time');
        console.error(error);
        sendResponse(res, StatusCodes.INTERNAL_SERVER, StatusMessages.INTERNAL_SERVER);
    }
}
