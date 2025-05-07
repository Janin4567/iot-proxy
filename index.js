const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/devices', async (req, res) => {
  try {
    const response = await fetch('http://100.29.185.216:80/api/devices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error en el proxy:', error);
    res.status(500).json({ error: 'Error al reenviar la solicitud' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy funcionando en http://localhost:${PORT}`);
});
