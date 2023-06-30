import type { GetServerSidePropsContext } from 'next';
import config from '../../config';
import { validate } from './validateJwt';

export async function ssrPropsUser({ req }: GetServerSidePropsContext) {
    const { cookies } = req;
    const token = cookies[config.auth_token_name];

    const payload = await validate(token);

    // const name = null;
    let email = null;
    let id = null;

    if (payload !== undefined && payload !== null) {
        try {
            // name = payload.name;
            email = String(payload.user);
            id = payload.sub;
        } catch (error) {
            console.log(error);
        }
    }
    return {
        id,
        email,
        token,
    };
}

export async function ssrToken({ req }: GetServerSidePropsContext) {
    const { cookies } = req;
    const token = cookies[config.auth_token_name];

    return {
        token,
    };
}
