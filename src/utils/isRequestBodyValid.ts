import { RequestBody } from "../server/RequestBody.js"
import { IncomingMessage, ServerResponse } from "http";
import { sendResponse } from "./sendResponse.js";
import { StatusCodes, StatusMessages } from "../server/consts.js";

export const isRequestBodyValid = (res: ServerResponse<IncomingMessage>, userData: RequestBody) => {
    try {
        if (!userData) return false;
        return 'age' in userData 
            && typeof userData.age === 'number'
            && 'hobbies' in userData
            && Array.isArray(userData.hobbies)
            && 'username' in userData
            && typeof userData.username === 'string';
    } catch (error) {
        console.log('Something went wrong. Try one more time');
        console.error(error);
        sendResponse(res, StatusCodes.INTERNAL_SERVER, StatusMessages.INTERNAL_SERVER);
    }
}
