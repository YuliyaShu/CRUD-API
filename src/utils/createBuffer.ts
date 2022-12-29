import { ServerResponse, IncomingMessage } from "http";
import { StatusCodes, StatusMessages } from "../server/consts.js";
import { User } from "../user/User.js";
import { sendResponse } from "./sendResponse.js";

export const createBuffer = (data: User[] | User | {code: number, message: string}, res: ServerResponse<IncomingMessage>) => {
    try {
        const json = JSON.stringify(data);
        return Buffer.from(json);
    } catch (error) {
        console.log('Something went wrong. Try one more time');
        console.error(error);
        sendResponse(res, StatusCodes.INTERNAL_SERVER, StatusMessages.INTERNAL_SERVER);
    }
}
