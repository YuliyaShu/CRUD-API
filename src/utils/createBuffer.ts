import { User } from "../user/User";

export const createBuffer = (data: User[] | User | {code: number, message: string}) => {
    const json = JSON.stringify(data);
    return Buffer.from(json);
}
