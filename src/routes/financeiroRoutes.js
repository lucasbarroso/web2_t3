import express from 'express';
import { getFinanceiroPage } from '../controllers/financeiroController.js';
import { ensurePermission } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ensure only authorized users can access
router.use(ensurePermission('FINANCEIRO'));

// Financeiro main page
router.get('/', getFinanceiroPage);

export { router as financeiroRoutes };
