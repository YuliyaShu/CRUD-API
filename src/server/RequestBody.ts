import { User } from "../user/User";

export type RequestBody = Omit<User, "id">;
