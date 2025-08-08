"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarSala = criarSala;
exports.listarSalas = listarSalas;
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
//# sourceMappingURL=salaController.js.map