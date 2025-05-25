const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

// Serve arquivos estáticos (CSS, JS, imagens, etc)
app.use(express.static(path.join(__dirname)));

// Rota raiz serve o painel.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'painel.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
