import express from 'express';
import { criarPessoa, listarPessoas } from './controllers/pessoaController';
import { criarSala, listarSalas } from './controllers/salaController';
import { criarReserva, listarReservas, buscarReservasPorPessoa } from './controllers/reservaController';

const app = express();
app.use(express.json());

// Rotas para Pessoas
app.post('/pessoas', criarPessoa);
app.get('/pessoas', listarPessoas);


// Rotas para Salas
app.post('/salas', criarSala);
app.get('/salas', listarSalas);

// Rotas para Reservas
app.post('/reservas', criarReserva);
app.get('/reservas', listarReservas);
app.get('/pessoas/:pessoaId/reservas', buscarReservasPorPessoa);

app.listen(3000, () => console.log('API rodando na porta 3000'));