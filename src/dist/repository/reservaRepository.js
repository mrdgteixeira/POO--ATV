"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ReservaRepository {
    async temConflito(pessoaId, inicio, fim) {
        const reserva = await prisma.reserva.findFirst({
            where: {
                pessoaId,
                OR: [
                    { inicio: { lte: fim }, fim: { gte: inicio } }
                ]
            }
        });
        return !!reserva;
    }
    async criar(pessoaId, salaId, inicio, fim) {
        // Verificar conflito antes de criar
        const conflito = await this.temConflito(pessoaId, inicio, fim);
        if (conflito) {
            throw new Error('Pessoa já possui reserva nesse horário!');
        }
        return await prisma.reserva.create({
            data: { pessoaId, salaId, inicio, fim }
        });
    }
    async listarTodos() {
        return await prisma.reserva.findMany({
            include: {
                pessoa: true,
                sala: true
            }
        });
    }
    async buscarPorId(id) {
        return await prisma.reserva.findUnique({
            where: { id },
            include: {
                pessoa: true,
                sala: true
            }
        });
    }
    async buscarPorPessoa(pessoaId) {
        return await prisma.reserva.findMany({
            where: { pessoaId },
            include: {
                pessoa: true,
                sala: true
            }
        });
    }
    async buscarPorSala(salaId) {
        return await prisma.reserva.findMany({
            where: { salaId },
            include: {
                pessoa: true,
                sala: true
            }
        });
    }
    async atualizar(id, dados) {
        return await prisma.reserva.update({
            where: { id },
            data: dados,
            include: {
                pessoa: true,
                sala: true
            }
        });
    }
    async deletar(id) {
        return await prisma.reserva.delete({
            where: { id }
        });
    }
}
exports.ReservaRepository = ReservaRepository;
//# sourceMappingURL=reservaRepository.js.map