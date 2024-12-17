// routes/authRoutes.js

import express from 'express';
const router = express.Router();
import { authController } from '../controllers/authController.js';
// Login page
router.get('/login', authController.getLoginPage);

// Login action
router.post('/login', authController.login);

// Logout action
router.post('/logout', authController.logout);

export {
    router as authRoutes
};
