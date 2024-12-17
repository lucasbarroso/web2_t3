import express from 'express';
import { getRelatorioPage } from '../controllers/relatorioController.js';
import { ensurePermission } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ensure only authorized users can access
router.use(ensurePermission('RELATORIOS'));

// Relatórios main page
router.get('/', getRelatorioPage);

export { router as relatorioRoutes };

