import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ReservaRepository {
  async temConflito(pessoaId: number, inicio: Date, fim: Date): Promise<boolean> {
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

  async criar(pessoaId: number, salaId: number, inicio: Date, fim: Date) {
    // Verificar se a pessoa já tem reserva nesse horário
    const conflitoPessoa = await this.temConflito(pessoaId, inicio, fim);
    if (conflitoPessoa) {
      throw new Error('Pessoa já possui reserva nesse horário!');
    }

    // Verificar se a sala já está ocupada nesse horário
    const salaOcupada = await prisma.reserva.findFirst({
      where: {
        salaId,
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
    });

    if (salaOcupada) {
      throw new Error('Sala já está ocupada nesse horário!');
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


  async buscarPorPessoa(pessoaId: number) {
    return await prisma.reserva.findMany({
      where: { pessoaId },
      include: {
        pessoa: true,
        sala: true
      }
    });
  }
}