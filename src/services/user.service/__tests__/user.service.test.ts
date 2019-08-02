import UserService from '../user.service';

describe('User Service test', () => {

    afterAll(localStorage.clear);

    it('Should contain the class instance', () => {
        const instance = UserService.instance;

        expect(instance).toBeInstanceOf(UserService);
    });

    it('Should login without errors', async () => {
        const instance = UserService.instance;
        await instance.login();
    });

    it('Should logout without errors', async () => {
        const instance = UserService.instance;
        await instance.logout();
    });

    it('Should be logged in', async () => {
        const instance = UserService.instance;
        await instance.login();
        const isLogged = await instance.isLogged();

        expect(isLogged).toBeTruthy();
    });

    it('Should be logged out', async () => {
        const instance = UserService.instance;
        await instance.logout();
        const isLogged = await instance.isLogged();

        expect(isLogged).toBeFalsy();
    });
});
