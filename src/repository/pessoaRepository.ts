import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PessoaRepository {
  async criar(nome: string, email: string) {
    return await prisma.pessoa.create({
      data: { nome, email }
    });
  }

  async listarTodos() {
    return await prisma.pessoa.findMany();
  }
}
