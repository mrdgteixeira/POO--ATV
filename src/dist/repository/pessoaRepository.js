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
}
exports.PessoaRepository = PessoaRepository;
//# sourceMappingURL=pessoaRepository.js.map