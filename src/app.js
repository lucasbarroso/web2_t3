import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { authRoutes } from './routes/authRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
import { financeiroRoutes } from './routes/financeiroRoutes.js';
import { relatorioRoutes } from './routes/relatorioRoutes.js';
import { produtoRoutes } from './routes/produtoRoutes.js'; // Verifique esta linha
import { homeRoutes } from './routes/homeRoutes.js';

// Resolvendo o equivalente a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas (certifique-se que as rotas estão importadas corretamente)

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/financeiro', financeiroRoutes);
app.use('/relatorio', relatorioRoutes);
app.use('/produto', produtoRoutes);
app.use(homeRoutes); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.redirect('auth/login');
});
// // Error handling
// app.use((req, res) => {
//   res.status(404).render('error', { message: 'Página não encontrada.' });
// });


async function createSuperUser() {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { role: 'SUPERADMIN' },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('CHAVE'+'admin', 10); // Defina sua senha padrão
      await prisma.user.create({
        data: {
          name: 'Super Admin',
          email: 'admin@admin.com',
          password: hashedPassword,
          role: 'SUPERADMIN',
        },
      });
      console.log('Superusuário criado com sucesso!');
    } else {
      console.log('Superusuário já existe.');
    }
  } catch (error) {
    console.error('Erro ao criar superusuário:', error);
  }
}

createSuperUser();

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});