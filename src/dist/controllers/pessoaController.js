"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarPessoa = criarPessoa;
exports.listarPessoas = listarPessoas;
const pessoaRepository_1 = require("../repository/pessoaRepository");
const pessoaRepository = new pessoaRepository_1.PessoaRepository();
async function criarPessoa(req, res) {
    try {
        const { nome, email } = req.body;
        const pessoa = await pessoaRepository.criar(nome, email);
        res.status(201).json(pessoa);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function listarPessoas(req, res) {
    try {
        const pessoas = await pessoaRepository.listarTodos();
        res.json(pessoas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//# sourceMappingURL=pessoaController.js.map