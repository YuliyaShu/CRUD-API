import { RequestBody } from "../server/RequestBody"

export const isRequestBodyValid = (userData: RequestBody) => {
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
    }
}
