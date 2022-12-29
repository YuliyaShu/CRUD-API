import { IncomingMessage, ServerResponse } from 'node:http';
import { StatusCodes, StatusMessages } from './consts.js';
import { sendResponse } from '../utils/sendResponse.js';
import { state } from '../user/state.js';
import { User } from '../user/User.js';
import { createUser } from '../user/userService/createUser.js';
import { getUserId } from '../utils/getUserId.js';
import { getAllUsers } from '../user/userService/getAllUsers.js';
import { getUser } from '../user/userService/getUser.js';
import { updateUser } from '../user/userService/updateUser.js';
import { deleteUser } from '../user/userService/deleteUser.js';
import { isUserDataValid } from '../user/userService/isUserDataValid.js';

export const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        if (req.url?.startsWith('/api/users')) {
            const allUsers = state;
            const userId = getUserId(req);

            if (!userId) {
                switch (req.method) {
                    case 'GET':
                        getAllUsers(res, allUsers);
                        break;
                    case 'POST':
                        createUser(req, res, allUsers);
                        break;
                    default:
                        sendResponse(res, StatusCodes.BAD_REQUEST, StatusMessages.BAD_REQUEST);
                        break;
                }
            } else {
                if (isUserDataValid(res, userId, allUsers)) {
                    let existUser = { id: '', username: '', age: 0, hobbies: [] } as User;
                    allUsers.some(user => {
                        existUser = user;
                        return user.id === userId;
                    })
                    switch (req.method) {
                        case 'GET':
                            getUser(res, existUser);
                            break;
                        case 'PUT':
                            updateUser(req, res, allUsers, userId);
                            break;
                        case 'DELETE':
                            deleteUser(res, allUsers, userId);
                            break;
                        default:
                            sendResponse(res, StatusCodes.BAD_REQUEST, StatusMessages.BAD_REQUEST);
                            break;
                        }
                }
            }
        } else {
            sendResponse(res, StatusCodes.NOT_FOUND, StatusMessages.NOT_FOUND);
            return;
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log('Something went wrong. Try one more time');
            console.error(error.message);
        }
        sendResponse(res, StatusCodes.INTERNAL_SERVER, StatusMessages.INTERNAL_SERVER);
    }
}
