"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarPessoa = criarPessoa;
exports.listarPessoas = listarPessoas;
exports.buscarPessoaPorId = buscarPessoaPorId;
exports.atualizarPessoa = atualizarPessoa;
exports.deletarPessoa = deletarPessoa;
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
async function buscarPessoaPorId(req, res) {
    try {
        const { id } = req.params;
        const pessoa = await pessoaRepository.buscarPorId(Number(id));
        if (!pessoa) {
            return res.status(404).json({ error: 'Pessoa não encontrada' });
        }
        res.json(pessoa);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function atualizarPessoa(req, res) {
    try {
        const { id } = req.params;
        const dados = req.body;
        const pessoa = await pessoaRepository.atualizar(Number(id), dados);
        res.json(pessoa);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function deletarPessoa(req, res) {
    try {
        const { id } = req.params;
        await pessoaRepository.deletar(Number(id));
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//# sourceMappingURL=pessoaController.js.map