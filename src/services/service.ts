import { ReservaRepository } from '../repository/reservaRepository';

export class ReservaService {
  private reservaRepository = new ReservaRepository();

  async criarReserva(pessoaId: number, salaId: number, inicio: Date, fim: Date) {
    // Verifica se já existe reserva para a pessoa no mesmo horário
    const conflito = await this.reservaRepository.temConflito(pessoaId, inicio, fim);
    if (conflito) {
      throw new Error('Pessoa já possui reserva nesse horário!');
    }
    return this.reservaRepository.criar(pessoaId, salaId, inicio, fim);
  }
}