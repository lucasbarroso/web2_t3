// controllers/authController.js

import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export const authController = {
  // Render login page
  getLoginPage: (req, res) => {
    res.render('login', { message: null });
  },

  // Handle login
login: async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare("CHAVE" + password, user.password)) {
      req.session.userId = user.id;
      req.session.userEmail = user.email;
      req.session.role = user.role; // Essa role tem que ser filtrada em outros controllers
      return res.redirect('/home');
    }
    res.render('login', { message: 'Credenciais inválidas.' });
  } catch (error) {
    console.error('Erro no login:', error);
    res.render('login', { message: 'Ocorreu um erro, tente novamente.' });
  }
},


  // Handle logout
  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/auth/login');
    });
  }
};
