import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import config from '../../../../config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const { cookies } = req;

    const serialized = serialize('auth-token', '', {
        httpOnly: true,
        secure: config.env === 'production',
        sameSite: 'strict',
        maxAge: -1,
        path: '/',
    });

    return res
        .setHeader('Set-Cookie', serialized)
        .status(204).json({});
}
