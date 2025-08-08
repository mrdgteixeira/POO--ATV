import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SalaRepository {
  async criar(nome: string, capacidade: number) {
    return await prisma.sala.create({
      data: { nome, capacidade }
    });
  }

  async listarTodos() {
    return await prisma.sala.findMany();
  }
}
