import { IncomingMessage, ServerResponse } from 'node:http';
import { StatusCodes, StatusMessages } from './consts.js';
import { sendResponse } from '../utils/sendResponse.js';
import { state } from '../user/state.js';
import { createBuffer } from '../utils/createBuffer.js';

export const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        if (req.url?.startsWith('/api/users')) {
            const allUsers = state;
            const allUsersBuffer = createBuffer(allUsers);
            const lastPartOfRequest = req.url.split('/').slice(-1).join('');
            const userId = (lastPartOfRequest === 'users') ? '' : lastPartOfRequest;

            if (!userId) {
                switch (req.method) {
                    case 'GET':
                        sendResponse(res, StatusCodes.OK, StatusMessages.OK, allUsersBuffer);
                        break;
                    case 'POST':
                    default:
                }
            } else {
                switch (req.method) {
                    case 'GET':
                    case 'PUT':
                    case 'DELETE':
                    default:
                }
            }

        } else {
            sendResponse(res, StatusCodes.NotFound, StatusMessages.NotFound);
            throw new Error(StatusMessages.NotFound);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
        
    }
}
