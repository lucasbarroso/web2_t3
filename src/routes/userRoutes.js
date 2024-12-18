
import express from 'express';
import { getCreateUserPage, createUser, listUsers, upload } from '../controllers/userController.js';
import { ensureAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ensure only admins or superusers access these routes
router.use(ensureAdmin);

// Create user page
router.get('/create', getCreateUserPage);

// Rota para criar usuário com upload de foto 
router.post('/create', upload.single('image'), createUser);

// List all users
router.get('/', listUsers);

export { router as userRoutes };
