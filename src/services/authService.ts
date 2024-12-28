import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
    findUserById,
    createUser
} from '../models/userModel.js';

import AppDataSource from '../utils/db.js';
import { User } from '../entities/User.js';
import { UserToken } from '../entities/UserToken.js';

export async function registerUser(id: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(id, hashedPassword);

    const accessToken = jwt.sign(
        { id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn:  process.env.ACCESS_TOKEN_EXPIRATION }
    );
    const refreshToken = jwt.sign(
        { id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn:  process.env.REFRESH_TOKEN_EXPIRATION }
    );

    await saveToken(id, accessToken);

    return { accessToken, refreshToken };
}

export async function loginUser(id: string, password: string) {
    const user = await findUserById(id);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }

    const accessToken = jwt.sign(
        { id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn:  process.env.ACCESS_TOKEN_EXPIRATION }
    );
    const refreshToken = jwt.sign(
        { id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn:  process.env.REFRESH_TOKEN_EXPIRATION }
    );

    await saveToken(id, accessToken);

    return { accessToken, refreshToken };
}

export function refreshAccessToken(refreshToken: string) {
    const payload = jwt.verify(refreshToken,  process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign(
        { id: (payload as any).id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn:  process.env.ACCESS_TOKEN_EXPIRATION }
    );
    return newAccessToken;
}

async function saveToken(userId: string, token: string) {
    const tokenRepo = AppDataSource.getRepository(UserToken);

    const userToken = new UserToken();
    userToken.token = token;
    userToken.user = await AppDataSource.getRepository(User).findOneOrFail({ where: { id: userId } });
    await tokenRepo.save(userToken);
}

export async function logoutUser(token: string) {
    const tokenRepo = AppDataSource.getRepository(UserToken);

    await tokenRepo.update({ token }, { isValid: false });
}