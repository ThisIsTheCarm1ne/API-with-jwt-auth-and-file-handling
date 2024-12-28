import jwt from 'jsonwebtoken';
import {
    NextFunction,
    Request,
    Response
} from 'express';

import AppDataSource from '../utils/db.js';
import { UserToken } from '../entities/UserToken.js';

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

        const tokenRepo = AppDataSource.getRepository(UserToken);
        const validToken = await tokenRepo.findOne({ where: { token, isValid: true } });

        if (!validToken) {
            return res.status(403).json({ message: 'Token is invalid' });
        }

        (req as any).user = decoded;
        next();
    } catch {
        res.status(403).json({ message: 'Forbidden' });
    }
};