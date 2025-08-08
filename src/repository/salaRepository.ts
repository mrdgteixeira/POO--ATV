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

  async buscarPorId(id: number) {
    return await prisma.sala.findUnique({
      where: { id }
    });
  }

  async buscarPorNome(nome: string) {
    return await prisma.sala.findFirst({
      where: { 
        nome: {
          equals: nome,
          mode: 'insensitive'
        }
      }
    });
  }

  async atualizar(id: number, dados: { nome?: string; capacidade?: number }) {
    return await prisma.sala.update({
      where: { id },
      data: dados
    });
  }

  async deletar(id: number) {
    return await prisma.sala.delete({
      where: { id }
    });
  }

  async buscarDisponiveis(inicio: Date, fim: Date) {
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
