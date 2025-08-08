"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pessoaController_1 = require("./controllers/pessoaController");
const salaController_1 = require("./controllers/salaController");
const reservaController_1 = require("./controllers/reservaController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rotas para Pessoas
app.post('/pessoas', pessoaController_1.criarPessoa);
app.get('/pessoas', pessoaController_1.listarPessoas);
// Rotas para Salas
app.post('/salas', salaController_1.criarSala);
app.get('/salas', salaController_1.listarSalas);
// Rotas para Reservas
app.post('/reservas', reservaController_1.criarReserva);
app.get('/reservas', reservaController_1.listarReservas);
app.get('/pessoas/:pessoaId/reservas', reservaController_1.buscarReservasPorPessoa);
app.listen(3000, () => console.log('API rodando na porta 3000'));
//# sourceMappingURL=app.js.map