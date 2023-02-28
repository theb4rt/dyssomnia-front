interface IConfig {
    env: string;
    secret: string;
    api_url: string;
    auth_token_name: string;
    google_api_key: string;
}

const config: IConfig = {
    env: process.env.NODE_ENV || 'development',
    secret: process.env.APP_SECRET_KEY || '',
    api_url: process.env.NEXT_PUBLIC_DYSSOMNIA_API || 'http://localhost',
    auth_token_name: 'auth-token',
    google_api_key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
};

export default config;
