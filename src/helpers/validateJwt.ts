import * as jose from 'jose';
import { KJUR } from 'jsrsasign';
import config from '../../config';

const validate = async (token: string | undefined) => {
    if (token === undefined || token === null) {
        console.log(token);
        return null;
    }

    try {
        const sec_key = config.secret;
        const publicKeyPEM = sec_key.replace(/\\n/g, '\n');

        const isValid = KJUR.jws.JWS.verify(token, publicKeyPEM, ['RS256']);
        if (!isValid) {
            return null;
        }

        const payload = jose.decodeJwt(token);
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
