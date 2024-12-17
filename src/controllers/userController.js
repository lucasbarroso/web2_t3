import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getCreateUserPage = (req, res) => {
  res.render('createUser', { message: null });
};

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash("CHAVE" + password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });
    res.redirect('/users');
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.render('createUser', { message: 'Ocorreu um erro, tente novamente.' });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ include: { permissions: true } });
    res.render('listUsers', { 
      data: {
        title: 'Lista de Usuários',
        users 
      } 
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.render('error', { message: 'Não foi possível carregar os usuários.' });
  }
};
