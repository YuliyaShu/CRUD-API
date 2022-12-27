import { User } from "../user/User";

export const createBuffer = (data: User[] | User) => {
    const json = JSON.stringify(data);
    return Buffer.from(json);
}
