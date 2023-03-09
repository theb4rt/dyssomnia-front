import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import config from '../../../../config';
import Auth from '../../../../services/authService';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const auth = new Auth();
    const { username, password } = req.body;

    try {
        const response = await auth.login({ username, password });

        const serialized = serialize('auth-token', response.data.token, {
            httpOnly: true,
            secure: config.env === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: '/',
        });

        return res
            .setHeader('Set-Cookie', serialized)
            .status(200)
            .json(response);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
