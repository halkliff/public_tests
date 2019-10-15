import axios, {AxiosResponse} from 'axios';
import {BASE_URL} from '@/utils/urls';

export interface IUserData {
    id: number;
    name: string;
    mail: string;
    password: string;
}

/**
 * Mock service for user account management.
 * This class is served as a factory for keeping it's instance consistent across all it's uses.
 *
 * To call up the class, you need to use `UserService.instance`
 */
export default class UserService {

    private constructor() {
        this.storage = localStorage;
    }

    /**
     *  Getter for the class' instance.
     *  Usage:
     *
     *  `const userService: UserService = UserService.instance;`
     */
    static get instance(): UserService {
        if (UserService._instance === undefined) {
            UserService._instance = new UserService();
        }
        return UserService._instance;
    }

    /**
     * The factory instance.
     * This static variable is used to keep the class instance consistent across everywhere it
     * might be used.
     */
    private static _instance?: UserService | undefined;

    /**
     * @mock Mock storage
     */
    private storage: Storage;

    /**
     * @deprecated Method to get the service istance.
     *
     * @return the factory's instance.
     */
    static getInstance(): UserService {
        return UserService.instance;
    }

    static async getUsers(limit: number = 30, page: number = 0, sortBy?: string | undefined):
        Promise<AxiosResponse<IUserData[]>> {
        return await axios.get<IUserData[]>(`${BASE_URL}/users`, {
            params: {
                _limit: limit,
                _page: page,
                _sort: sortBy
            }
        });
    }

    static async getUser(id: number): Promise<IUserData> {
        return (await axios.get<IUserData>(`${BASE_URL}/users/${id}`)).data;
    }

    static async addUser(user: IUserData): Promise<void> {
        await axios.post(`${BASE_URL}/users`, user);
    }

    /**
     * @mock Login method
     */
    async login(): Promise<void> {
        this.storage.setItem('logged', 'true');
    }

    /**
     * @mock Logout method
     */
    async logout(): Promise<void> {
        this.storage.setItem('logged', 'false');
    }

    /**
     * @mock Verifies whether the current user is logged in or not.
     */
    async isLogged(): Promise<boolean> {
        const isLogged = this.storage.getItem('logged');
        if (!isLogged) {
            return false;
        }
        return isLogged === 'true';
    }

}
