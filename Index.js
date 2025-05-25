const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

let sites = {}; // armazenamento simples em memória

// Rota para cadastro de site
app.post('/api/sites', (req, res) => {
  const { siteId, name } = req.body;
  if (!siteId || !name) {
    return res.status(400).json({ error: 'siteId e name são obrigatórios' });
  }
  sites[siteId] = { name, subscribers: [] };
  res.json({ message: 'Site cadastrado com sucesso', site: sites[siteId] });
});

// Rota para registrar inscritos (simples)
app.post('/api/subscribe', (req, res) => {
  const { siteId, subscriber } = req.body;
  if (!siteId || !subscriber) {
    return res.status(400).json({ error: 'siteId e subscriber são obrigatórios' });
  }
  if (!sites[siteId]) return res.status(404).json({ error: 'Site não encontrado' });
  sites[siteId].subscribers.push(subscriber);
  res.json({ message: 'Inscrição registrada' });
});

// Rota para enviar notificação manual
app.post('/api/notify', (req, res) => {
  const { siteId, title, message } = req.body;
  if (!siteId || !title || !message) {
    return res.status(400).json({ error: 'siteId, title e message são obrigatórios' });
  }
  if (!sites[siteId]) return res.status(404).json({ error: 'Site não encontrado' });
  
  res.json({ message: `Notificação enviada para ${sites[siteId].subscribers.length} inscritos` });
});

app.listen(PORT, () => {
  console.log(`Push Brasil rodando na porta ${PORT}`);
});
