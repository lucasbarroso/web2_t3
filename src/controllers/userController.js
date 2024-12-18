import multer from 'multer';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();


export const getCreateUserPage = (req, res) => {
  const sessionUserRole = req.session.role || 'USER'; // Defina o papel do usuário da sessão
  res.render('createUser', { message: null, sessionUserRole });
};



// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nome do arquivo
  },
});

const upload = multer({ storage });

// Função para criar usuário com upload de foto
export const createUser = async (req, res) => {
  const { name, email, password, role, modules } = req.body;
  const image = req.file ? req.file.filename : null; // Verifica se há uma imagem
  try {
    const hashedPassword = await bcrypt.hash("CHAVE" + password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role, image }
    });

    const modulesArray = Array.isArray(modules) ? modules : [modules];

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


export { upload };