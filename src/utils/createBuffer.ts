import { User } from "../user/User";

export const createBuffer = (data: User[]) => {
    const json = JSON.stringify(data);
    const allUsersBuffer = Buffer.from(json);
    return allUsersBuffer;
}
