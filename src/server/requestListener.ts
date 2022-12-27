import { IncomingMessage, ServerResponse } from 'node:http';
import { StatusCodes, StatusMessages } from './consts.js';
import { sendResponse } from '../utils/sendResponse.js';
import { state } from '../user/state.js';
import { createBuffer } from '../utils/createBuffer.js';
import { RequestBody } from './RequestBody.js';
import { User } from '../user/User.js';
import { isUserDataValid } from '../utils/isUserDataValid.js';
import { v4 as uuidv4, validate } from 'uuid';

export const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        if (req.url?.startsWith('/api/users')) {
            const allUsers = state;
            let allUsersBuffer = createBuffer(allUsers)
            const lastPartOfRequest = req.url.split('/').slice(-1).join('');
            const userId = (lastPartOfRequest === 'users') ? '' : lastPartOfRequest;

            if (!userId) {
                let body = '';
                switch (req.method) {
                    case 'GET':
                        sendResponse(res, StatusCodes.OK, StatusMessages.OK, allUsersBuffer);
                        break;
                    case 'POST':
                        req.on('data', (chunk) => {
                        body += chunk;
                            }).on('end', () => {
                                const userData: RequestBody = JSON.parse(body);
                                if (isUserDataValid(userData)) {
                                    const id = uuidv4();
                                    const user: User = {...userData, ...{id: id}};
                                    const userBuffer = createBuffer(user);
                                    allUsersBuffer = Buffer.concat([allUsersBuffer, userBuffer]);
                                    allUsers.push(user);
                                    console.log('🚀 ~ req.on ~ allUsers', allUsers);
                                    sendResponse(res, StatusCodes.OK, StatusMessages.OK, userBuffer);
                                    console.log('🚀 ~ req.on ~ user', user);
                                } else {
                                    sendResponse(res, StatusCodes.BadRequest, StatusMessages.BadRequest);
                                }
                            });
                        break;
                    default:
                }
            } else {
                if (!validate(userId)) {
                    sendResponse(res, StatusCodes.BadRequest, StatusMessages.BadRequest);
                    return;
                } 
                if (!allUsers.length) {
                    sendResponse(res, StatusCodes.NotFound, StatusMessages.NotFound);
                    return;
                }
                let isUserExist = false;
                let existUser = {
                    id: '',
                    username: '',
                    age: 0,
                    hobbies: []
                } as User;
                allUsers.forEach(user => {
                    if (user.id === userId) {
                        isUserExist = true;
                        existUser = user
                    }
                })
                if (!isUserExist) {
                    sendResponse(res, StatusCodes.NotFound, StatusMessages.NotFound);
                    return;
                }
                const userWithoutId = {
                    username: existUser.username,
                    age: existUser.age,
                    hobbies: existUser.hobbies
                } as User;
                const userWithoutIdBuffer = createBuffer(userWithoutId);
                switch (req.method) {
                    case 'GET':
                        sendResponse(res, StatusCodes.OK, StatusMessages.OK, userWithoutIdBuffer);
                        console.log(allUsers);
                        break;
                    case 'PUT':
                    case 'DELETE':
                    default:
                
                    }
            }
        } else {
            sendResponse(res, StatusCodes.NotFound, StatusMessages.NotFound);
        }
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
    }
}
