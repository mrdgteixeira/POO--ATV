"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaService = void 0;
const pessoaRepository_1 = require("../repository/pessoaRepository");
class PessoaService {
    pessoaRepository = new pessoaRepository_1.PessoaRepository();
    async criarPessoa(nome, email) {
        // Validações básicas
        if (!nome || nome.trim().length === 0) {
            throw new Error('Nome é obrigatório!');
        }
        if (!email || email.trim().length === 0) {
            throw new Error('Email é obrigatório!');
        }
        // Validação de formato de email básica
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Email deve ter um formato válido!');
        }
        // Verificar se email já existe
        const pessoasExistentes = await this.pessoaRepository.listarTodos();
        const emailJaExiste = pessoasExistentes.some((pessoa) => pessoa.email.toLowerCase() === email.toLowerCase());
        if (emailJaExiste) {
            throw new Error('Email já está sendo usado por outra pessoa!');
        }
        return this.pessoaRepository.criar(nome.trim(), email.toLowerCase());
    }
    async listarPessoas() {
        return this.pessoaRepository.listarTodos();
    }
}
exports.PessoaService = PessoaService;
//# sourceMappingURL=pessoaService.js.map