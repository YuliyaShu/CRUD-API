import { ServerResponse, IncomingMessage } from "http";
import { StatusCodes, StatusMessages } from "../../server/consts.js";
import { createBuffer } from "../../utils/createBuffer.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { User } from "../User.js";

export const getUser = (res: ServerResponse<IncomingMessage>, existUser: User) => {
    try {
        const userWithoutId = {
            username: existUser.username,
            age: existUser.age,
            hobbies: existUser.hobbies
        } as User;
        const userWithoutIdBuffer = createBuffer(userWithoutId);
        sendResponse(res, StatusCodes.OK, StatusMessages.OK, userWithoutIdBuffer);
    } catch (error) {
        console.log('Something went wrong. Try one more time');
        console.error(error);
    }
}
