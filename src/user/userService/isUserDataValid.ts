import { ServerResponse, IncomingMessage } from "http";
import { validate } from "uuid";
import { StatusCodes, StatusMessages } from "../../server/consts.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { User } from "../User.js";

export const isUserDataValid = (res: ServerResponse<IncomingMessage>, userId: string, allUsers: User[]) => {
    try {
        if (!validate(userId)) {
            sendResponse(res, StatusCodes.BAD_REQUEST, StatusMessages.BAD_REQUEST);
            return false;
        } 
        if (!allUsers.length) {
            sendResponse(res, StatusCodes.NOT_FOUND, StatusMessages.NOT_FOUND);
            return false;
        }
        let isUserExist = false;
        allUsers.forEach(user => {
            if (user.id === userId) {
                isUserExist = true;
            }
        })
        if (!isUserExist) {
            sendResponse(res, StatusCodes.NOT_FOUND, StatusMessages.NOT_FOUND);
            return false;
        }
        return true;
    } catch (error) {
        console.log('Something went wrong. Try one more time');
        console.error(error);
        sendResponse(res, StatusCodes.INTERNAL_SERVER, StatusMessages.INTERNAL_SERVER);
    }
}
