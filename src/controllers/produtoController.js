// controllers/produtoController.js

export const getProdutoPage = (req, res) => {
  res.render('modulePage', { title: 'Produtos', message: 'Bem-vindo ao módulo de produtos!' });
};
