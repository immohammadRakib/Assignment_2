import type { User } from "../../types";
declare class AuthService {
    createUser(userData: Partial<User>): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
}
declare const _default: AuthService;
export default _default;
