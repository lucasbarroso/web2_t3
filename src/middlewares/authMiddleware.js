import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const ensureLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  console.log('Usuário não está logado');
  res.redirect('/auth/login');
};

export const ensureAdmin = (req, res, next) => {
  if (req.session.role === 'ADMIN' || req.session.role === 'SUPERADMIN') {
    return next();
  }
  console.log('Usuário não tem permissão de administrador');
  res.render('error', { message: 'Sem permissão para acessar esta página.' });
};

export const ensurePermission = (module) => async (req, res, next) => {
  const { userId } = req.session;
  if (!userId) {
    console.log('Usuário não está logado');
    return res.redirect('/auth/login');
  }

  try {
    const permission = await prisma.permission.findFirst({
      where: { userId, module },
    });

    if (permission || req.session.role === 'SUPERADMIN' || req.session.role === 'ADMIN') {
      return next();
    }

    console.log(`Usuário ${userId} não tem permissão para acessar o módulo ${module}`);
    res.render('error', { message: `Sem permissão para acessar o módulo ${module}.` });
  } catch (error) {
    console.error('Erro ao verificar permissões:', error);
    res.render('error', { message: 'Erro ao verificar permissões. Tente novamente mais tarde.' });
  }
};
