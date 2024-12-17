// controllers/produtoController.js

export const getProdutoPage = (req, res) => {
  console.log("rodando produtos...")
  res.render('modulePage', { title: 'Produto', message: 'Bem-vindo ao módulo de produtos!' });
};
