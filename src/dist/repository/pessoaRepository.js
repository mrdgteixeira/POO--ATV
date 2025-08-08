"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PessoaRepository {
    async criar(nome, email) {
        return await prisma.pessoa.create({
            data: { nome, email }
        });
    }
    async listarTodos() {
        return await prisma.pessoa.findMany();
    }
    async buscarPorId(id) {
        return await prisma.pessoa.findUnique({
            where: { id }
        });
    }
    async buscarPorEmail(email) {
        return await prisma.pessoa.findUnique({
            where: { email }
        });
    }
    async atualizar(id, dados) {
        return await prisma.pessoa.update({
            where: { id },
            data: dados
        });
    }
    async deletar(id) {
        return await prisma.pessoa.delete({
            where: { id }
        });
    }
}
exports.PessoaRepository = PessoaRepository;
//# sourceMappingURL=pessoaRepository.js.map