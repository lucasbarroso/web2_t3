// controllers/financeiroController.js

export const getFinanceiroPage = (req, res) => {
  res.render('modulePage', { title: 'Financeiros', message: 'Bem-vindo ao módulo de Finanças!' });
};
