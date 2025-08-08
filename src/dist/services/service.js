"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaService = void 0;
const reservaRepository_1 = require("../repository/reservaRepository");
class ReservaService {
    reservaRepository = new reservaRepository_1.ReservaRepository();
    async criarReserva(pessoaId, salaId, inicio, fim) {
        // Verifica se já existe reserva para a pessoa no mesmo horário
        const conflito = await this.reservaRepository.temConflito(pessoaId, inicio, fim);
        if (conflito) {
            throw new Error('Pessoa já possui reserva nesse horário!');
        }
        return this.reservaRepository.criar(pessoaId, salaId, inicio, fim);
    }
}
exports.ReservaService = ReservaService;
//# sourceMappingURL=service.js.map