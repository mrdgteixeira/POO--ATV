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

  async buscarPorId(id: number) {
    return await prisma.pessoa.findUnique({
      where: { id }
    });
  }

  async buscarPorEmail(email: string) {
    return await prisma.pessoa.findFirst({
      where: { 
        email: {
          equals: email,
          mode: 'insensitive'
        }
      }
    });
  }

  async atualizar(id: number, dados: { nome?: string; email?: string }) {
    return await prisma.pessoa.update({
      where: { id },
      data: dados
    });
  }

  async deletar(id: number) {
    return await prisma.pessoa.delete({
      where: { id }
    });
  }
}
