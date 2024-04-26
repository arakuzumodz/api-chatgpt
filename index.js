const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/endereco', async (req, res) => {
    // Recebe o parâmetro 'endereco' da query string da URL
    const endereco = req.query.endereco;

    // Monta a URL de consulta ao Nominatim
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json&polygon=1&addressdetails=1`;

    try {
        // Faz a requisição ao Nominatim
        const response = await axios.get(url);
        // Envia a resposta JSON obtida
        res.json(response.data);
    } catch (error) {
        // Em caso de erro na requisição, envia o erro como resposta
        res.status(500).json({ message: 'Erro ao buscar dados de geolocalização', error: error.toString() });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
