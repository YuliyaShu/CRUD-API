import { IncomingMessage, ServerResponse } from "http";
import { StatusCodes, StatusMessages } from "../../server/consts.js";
import { RequestBody } from "../../server/RequestBody.js";
import { createBuffer } from "../../utils/createBuffer.js";
import { isRequestBodyValid } from "../../utils/isRequestBodyValid.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { User } from "../User.js";
import { v4 as uuidv4 } from 'uuid';

export const createUser = (req: IncomingMessage, res: ServerResponse<IncomingMessage>,  allUsers: User[]) => {
    try {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        }).on('end', async () => {
            const userData: RequestBody = await JSON.parse(body || JSON.stringify(body));
            if (isRequestBodyValid(res, userData)) {
                const id = uuidv4();
                const user: User = {...userData, ...{id: id}};
                const userBuffer = createBuffer(user, res);
                allUsers.push(user);
                sendResponse(res, StatusCodes.CREATED, StatusMessages.CREATED, userBuffer);
            } else {
                sendResponse(res, StatusCodes.BAD_REQUEST, StatusMessages.BAD_REQUEST);
            }
        });
    } catch (error) {
        console.log('Something went wrong. Try one more time');
        console.error(error);
        sendResponse(res, StatusCodes.INTERNAL_SERVER, StatusMessages.INTERNAL_SERVER);
    }
} 
