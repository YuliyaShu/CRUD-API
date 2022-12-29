import { StatusCodes, StatusMessages } from "../../server/consts.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { User } from "../User.js";
import { ServerResponse } from 'node:http';

export const deleteUser = (res: ServerResponse, allUsers: User[], userId: string) => {
    try {
        let indexForDelete = 0;
        allUsers.forEach((user, index) => {
            if (user.id === userId) {
                indexForDelete = index;
            }
        });
        allUsers.splice(indexForDelete, 1);
        sendResponse(res, StatusCodes.NO_CONTENT, StatusMessages.NO_CONTENT);
    } catch (error) {
        console.log('Something went wrong. Try one more time');
        console.error(error);
    }
}
