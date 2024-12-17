import express from 'express';
import { getProdutoPage } from '../controllers/produtoController.js';
import { ensurePermission } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ensure only authorized users can access
router.use(ensurePermission('PRODUTO'));

// Produtos main page
router.get('/', getProdutoPage);

export { router as produtoRoutes };
