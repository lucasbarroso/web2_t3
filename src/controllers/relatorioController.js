// controllers/relatorioController.js

export const getRelatorioPage = (req, res) => {
  res.render('modulePage', { title: 'Relatórios', message: 'Bem-vindo ao módulo de relatórios!' });
};
