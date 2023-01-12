import { ServerResponse } from "http";
import { StatusCodes, StatusMessages } from "../../server/consts.js";
import { createBuffer } from "../../utils/createBuffer.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { User } from "../User.js";

export const getAllUsers = (res: ServerResponse, allUsers: User[]) => {
    try {
        sendResponse(res, StatusCodes.OK, StatusMessages.OK, createBuffer(allUsers, res));
    } catch (error) {
        console.log('Something went wrong. Try one more time');
        console.error(error);
        sendResponse(res, StatusCodes.INTERNAL_SERVER, StatusMessages.INTERNAL_SERVER);
    }
}
