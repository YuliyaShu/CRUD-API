import { RequestBody } from "../server/RequestBody.js"
import { IncomingMessage, ServerResponse } from "http";
import { sendResponse } from "./sendResponse.js";
import { StatusCodes, StatusMessages } from "../server/consts.js";

const checkTypeOfHobbies = (arrayOfHobbies: string[] | []) => {
    if (arrayOfHobbies.length) {
        for (const hobby of arrayOfHobbies) {
            if (typeof hobby !== 'string') return false;
        }
    return true;
    }
}   

export const isRequestBodyValid = (res: ServerResponse<IncomingMessage>, userData: RequestBody) => {
    try {
        if (!userData) return false;
        return Object.keys(userData).length === 3
            && 'age' in userData 
            && typeof userData.age === 'number'
            && 'hobbies' in userData
            && Array.isArray(userData.hobbies)
            && checkTypeOfHobbies(userData.hobbies)
            && 'username' in userData
            && typeof userData.username === 'string'
            && userData
    } catch (error) {
        console.log('Something went wrong. Try one more time');
        console.error(error);
        sendResponse(res, StatusCodes.INTERNAL_SERVER, StatusMessages.INTERNAL_SERVER);
    }
        
        
}
