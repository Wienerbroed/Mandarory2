import express from 'express';
import { db } from '../db/db.js';

const router = express.Router();

// Login 
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) return res.json({ error: 'User not found' });

    const match = await comparePassword(password, user.password);
    if(password !== user.password) return res.json({ error: 'Credentials do not match'});
});


export default router;