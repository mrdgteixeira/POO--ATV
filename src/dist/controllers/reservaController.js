"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarReserva = criarReserva;
exports.listarReservas = listarReservas;
exports.buscarReservasPorPessoa = buscarReservasPorPessoa;
const reservaRepository_1 = require("../repository/reservaRepository");
const reservaRepository = new reservaRepository_1.ReservaRepository();
async function criarReserva(req, res) {
    try {
        const { pessoaId, salaId, inicio, fim } = req.body;
        const reserva = await reservaRepository.criar(pessoaId, salaId, new Date(inicio), new Date(fim));
        res.status(201).json(reserva);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function listarReservas(req, res) {
    try {
        const reservas = await reservaRepository.listarTodos();
        res.json(reservas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function buscarReservasPorPessoa(req, res) {
    try {
        const { pessoaId } = req.params;
        const reservas = await reservaRepository.buscarPorPessoa(Number(pessoaId));
        res.json(reservas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//# sourceMappingURL=reservaController.js.map