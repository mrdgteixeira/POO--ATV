"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaService = void 0;
const reservaRepository_1 = require("../repository/reservaRepository");
class ReservaService {
    reservaRepository = new reservaRepository_1.ReservaRepository();
    async criarReserva(pessoaId, salaId, inicio, fim) {
        // Validações básicas
        if (!pessoaId || pessoaId <= 0) {
            throw new Error('ID da pessoa é obrigatório!');
        }
        if (!salaId || salaId <= 0) {
            throw new Error('ID da sala é obrigatório!');
        }
        if (!inicio || !fim) {
            throw new Error('Horários de início e fim são obrigatórios!');
        }
        if (inicio >= fim) {
            throw new Error('Horário de início deve ser anterior ao fim!');
        }
        if (inicio < new Date()) {
            throw new Error('Não é possível reservar para datas passadas!');
        }
        // Verificar se a reserva não ultrapassa 8 horas
        const diferencaHoras = (fim.getTime() - inicio.getTime()) / (1000 * 60 * 60);
        if (diferencaHoras > 8) {
            throw new Error('Reserva não pode ultrapassar 8 horas!');
        }
        // Repository já faz todas as validações de conflito (pessoa + sala + existência)
        try {
            return await this.reservaRepository.criar(pessoaId, salaId, inicio, fim);
        }
        catch (error) {
            // Capturar erros de foreign key do Prisma para dar mensagens amigáveis
            if (error.code === 'P2003') {
                if (error.meta?.field_name === 'pessoaId') {
                    throw new Error('Pessoa não encontrada!');
                }
                if (error.meta?.field_name === 'salaId') {
                    throw new Error('Sala não encontrada!');
                }
                throw new Error('Dados inválidos para criação da reserva!');
            }
            throw error; // Re-throw outros erros
        }
    }
    async listarReservas() {
        return this.reservaRepository.listarTodos();
    }
    async buscarReservasPorPessoa(pessoaId) {
        if (!pessoaId || pessoaId <= 0) {
            throw new Error('ID da pessoa é obrigatório!');
        }
        return this.reservaRepository.buscarPorPessoa(pessoaId);
    }
}
exports.ReservaService = ReservaService;
//# sourceMappingURL=reservaService.js.map