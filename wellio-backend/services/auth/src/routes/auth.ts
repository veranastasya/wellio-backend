import express from 'express';
import { login, register, logout, refreshToken, forgotPassword, resetPassword } from '../controllers/authController';
import { validateLogin, validateRegister } from '../middleware/validation';

const router = express.Router();

// Authentication routes
router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router; 