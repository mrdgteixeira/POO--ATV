"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarSala = criarSala;
exports.listarSalas = listarSalas;
exports.buscarSalaPorId = buscarSalaPorId;
exports.atualizarSala = atualizarSala;
exports.deletarSala = deletarSala;
const salaRepository_1 = require("../repository/salaRepository");
const salaRepository = new salaRepository_1.SalaRepository();
async function criarSala(req, res) {
    try {
        const { nome, capacidade } = req.body;
        const sala = await salaRepository.criar(nome, capacidade);
        res.status(201).json(sala);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function listarSalas(req, res) {
    try {
        const salas = await salaRepository.listarTodos();
        res.json(salas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function buscarSalaPorId(req, res) {
    try {
        const { id } = req.params;
        const sala = await salaRepository.buscarPorId(Number(id));
        if (!sala) {
            return res.status(404).json({ error: 'Sala não encontrada' });
        }
        res.json(sala);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function atualizarSala(req, res) {
    try {
        const { id } = req.params;
        const dados = req.body;
        const sala = await salaRepository.atualizar(Number(id), dados);
        res.json(sala);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function deletarSala(req, res) {
    try {
        const { id } = req.params;
        await salaRepository.deletar(Number(id));
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//# sourceMappingURL=salaController.js.map