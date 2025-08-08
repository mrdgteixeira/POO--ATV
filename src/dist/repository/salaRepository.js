"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class SalaRepository {
    async criar(nome, capacidade) {
        return await prisma.sala.create({
            data: { nome, capacidade }
        });
    }
    async listarTodos() {
        return await prisma.sala.findMany();
    }
    async buscarPorId(id) {
        return await prisma.sala.findUnique({
            where: { id }
        });
    }
    async buscarPorNome(nome) {
        return await prisma.sala.findFirst({
            where: {
                nome: {
                    equals: nome,
                    mode: 'insensitive'
                }
            }
        });
    }
    async atualizar(id, dados) {
        return await prisma.sala.update({
            where: { id },
            data: dados
        });
    }
    async deletar(id) {
        return await prisma.sala.delete({
            where: { id }
        });
    }
    async buscarDisponiveis(inicio, fim) {
        return await prisma.sala.findMany({
            where: {
                reservas: {
                    none: {
                        OR: [
                            {
                                AND: [
                                    { inicio: { lte: inicio } },
                                    { fim: { gt: inicio } }
                                ]
                            },
                            {
                                AND: [
                                    { inicio: { lt: fim } },
                                    { fim: { gte: fim } }
                                ]
                            },
                            {
                                AND: [
                                    { inicio: { gte: inicio } },
                                    { fim: { lte: fim } }
                                ]
                            }
                        ]
                    }
                }
            }
        });
    }
}
exports.SalaRepository = SalaRepository;
//# sourceMappingURL=salaRepository.js.map