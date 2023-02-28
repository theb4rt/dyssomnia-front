import Service from './service';

interface LoginData {
    username: string;
    password: string;
}

class ApiAuthService extends Service {
    constructor() {
        super();
        this.baseUrl = '';
    }

    get prefix() {
        return '/api/auth';
    }

    login({
              username,
              password,
          }: LoginData) {
        return this.http('/login', {
            method: 'POST',
            body: {
                username,
                password,
            },
        });
    }

    logout() {
        return this.http('/logout', {
            method: 'POST',
        });
    }
}

export default ApiAuthService;
