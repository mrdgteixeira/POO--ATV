"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaService = void 0;
const salaRepository_1 = require("../repository/salaRepository");
class SalaService {
    salaRepository = new salaRepository_1.SalaRepository();
    async criarSala(nome, capacidade) {
        // Validações básicas
        if (!nome || nome.trim().length === 0) {
            throw new Error('Nome da sala é obrigatório!');
        }
        if (!capacidade || capacidade <= 0) {
            throw new Error('Capacidade deve ser um número positivo!');
        }
        if (capacidade > 1000) {
            throw new Error('Capacidade não pode exceder 1000 pessoas!');
        }
        // Como não há constraint único para nome de sala no schema,
        // vamos manter a verificação, mas de forma mais eficiente seria
        // adicionar uma constraint no banco ou criar um método específico
        const salasExistentes = await this.salaRepository.listarTodos();
        const nomeJaExiste = salasExistentes.some((sala) => sala.nome.toLowerCase() === nome.trim().toLowerCase());
        if (nomeJaExiste) {
            throw new Error('Já existe uma sala com este nome!');
        }
        return this.salaRepository.criar(nome.trim(), capacidade);
    }
    async listarSalas() {
        return this.salaRepository.listarTodos();
    }
}
exports.SalaService = SalaService;
//# sourceMappingURL=salaService.js.map