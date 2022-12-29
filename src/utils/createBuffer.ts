import { User } from "../user/User";

export const createBuffer = (data: User[] | User | {code: number, message: string}) => {
    try {
        const json = JSON.stringify(data);
        return Buffer.from(json);
    } catch (error) {
        console.log('Something went wrong. Try one more time');
        console.error(error);
    }
}
