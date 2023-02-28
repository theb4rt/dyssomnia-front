import Service from './service';

interface LoginData {
    username: string;
    password: string;
}

class AuthService extends Service {
    get prefix() {
        return '/api/v1';
    }

    login({
              username,
              password,
          }: LoginData) {
        return this.http('/user/login', {
            method: 'POST',
            body: {
                username,
                password,
            },
        });
    }
}

export default AuthService;
