import { RequestBody } from "../server/RequestBody"

export const isUserDataValid = (userData: RequestBody) => {
    console.log('im hereeeee');
    return 'age' in userData 
        && typeof userData.age === 'number'
        && 'hobbies' in userData
        && Array.isArray(userData.hobbies)
        && 'username' in userData
        && typeof userData.username === 'string';
}
