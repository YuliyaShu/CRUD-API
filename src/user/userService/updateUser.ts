import { StatusCodes, StatusMessages } from "../../server/consts.js";
import { RequestBody } from "../../server/RequestBody.js";
import { createBuffer } from "../../utils/createBuffer.js";
import { isUserDataValid } from "../../utils/isUserDataValid.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { User } from "../User.js";
import { ServerResponse, IncomingMessage } from 'node:http';

export const updateUser = (req: IncomingMessage, res: ServerResponse, allUsers: User[], userId: string) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
            }).on('end', () => {
                
                const userDataFromRequest: RequestBody = JSON.parse(body || JSON.stringify(''));
                if (isUserDataValid(userDataFromRequest)) {
                    allUsers.forEach(user => {
                        if (user.id === userId) {
                            user.age = userDataFromRequest.age;
                            user.hobbies = userDataFromRequest.hobbies;
                            user.username = userDataFromRequest.username;
                        }
                    })
                    const user: User = {...userDataFromRequest, ...{id: userId}};
                    const userBuffer = createBuffer(user);
                    sendResponse(res, StatusCodes.OK, StatusMessages.OK, userBuffer);
                } else {
                    sendResponse(res, StatusCodes.BAD_REQUEST, StatusMessages.BAD_REQUEST);
                }
            });
}