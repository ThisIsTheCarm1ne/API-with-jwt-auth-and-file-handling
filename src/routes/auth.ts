import { Router } from 'express';
import {
    registerUser,
    loginUser,
    refreshAccessToken
} from '../services/authService.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { logoutUser } from '../services/authService.js';

const router = Router();

router.post('/signup', async (req, res) => {
    const { id, password } = req.body;
    console.log(id, password);
    const tokens = await registerUser(id, password);
    res.json(tokens);
});

router.post('/signin', async (req, res) => {
    const { id, password } = req.body;
    console.log(id, password);
    const tokens = await loginUser(id, password);
    res.json(tokens);
});

router.post('/signin/new_token', (req, res) => {
    const { refreshToken } = req.body;
    const newAccessToken = refreshAccessToken(refreshToken);
    res.json({ accessToken: newAccessToken });
});

router.get('/info', authenticateToken, (req, res) => {
    res.json({ id: (req as any).user.id });
});

router.get('/logout', authenticateToken, async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    try {
        await logoutUser(token);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error during logout', error });
    }
});

export default router;