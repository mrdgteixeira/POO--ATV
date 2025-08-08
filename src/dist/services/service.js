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
        return this.reservaRepository.criar(pessoaId, salaId, inicio, fim);
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
//# sourceMappingURL=service.js.map