import { RequestBody } from "../server/RequestBody"

export const isUserDataValid = (userData: RequestBody) => {
    return 'age' in userData 
        && typeof userData.age === 'number'
        && 'hobbies' in userData
        && Array.isArray(userData.hobbies)
        && 'username' in userData
        && typeof userData.username === 'string';
}
