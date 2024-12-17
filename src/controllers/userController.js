import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getCreateUserPage = (req, res) => {
  const sessionUserRole = req.session.role || 'USER'; // Defina o papel do usuário da sessão
  res.render('createUser', { message: null, sessionUserRole });
};


export const createUser = async (req, res) => {
  const { name, email, password, role, modules } = req.body;
  try {
    const hashedPassword = await bcrypt.hash("CHAVE" + password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role }
    });

    // Verifica se 'modules' é um array (caso múltiplos módulos sejam selecionados)
    const modulesArray = Array.isArray(modules) ? modules : [modules];

    // Cria as permissões para os módulos selecionados
    for (const module of modulesArray) {
      await prisma.permission.create({
        data: {
          module,
          userId: user.id
        }
      });
    }

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
