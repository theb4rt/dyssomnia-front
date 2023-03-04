import config from '@config';
import { RequestCookie } from 'next/dist/server/web/spec-extension/cookies';
import * as jose from 'jose';
import { KJUR } from 'jsrsasign';

const validate = async (token: RequestCookie) => {
    if (!token) {
        console.log(token);
        return null;
    }

    try {
        const actual_token = token.value;
        const sec_key = config.secret;
        const publicKeyPEM = sec_key.replace(/\\n/g, '\n');

        const isValid = KJUR.jws.JWS.verify(actual_token, publicKeyPEM, ['RS256']);
        if (!isValid) {
            return null;
        }

        const payload = jose.decodeJwt(actual_token);
        const now = new Date();

        if (now.getTime() > Number(payload.exp) * 1000) {
            return null;
        }
        return payload;
    } catch
        (error) {
        console.log(error);
        return null;
    }
};
export { validate };
