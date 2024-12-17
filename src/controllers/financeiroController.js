// controllers/financeiroController.js

export const getFinanceiroPage = (req, res) => {
  res.render('modulePage', { title: 'Financeiro', message: 'Bem-vindo ao módulo de Finanças!' });
};
