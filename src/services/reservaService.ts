import { ReservaRepository } from '../repository/reservaRepository';

export class ReservaService {
  private reservaRepository = new ReservaRepository();

  async criarReserva(pessoaId: number, salaId: number, inicio: Date, fim: Date) {
    // Validações básicas
    if (!pessoaId || pessoaId <= 0) {
      throw new Error('ID da pessoa é obrigatório!');
    }

    if (!salaId || salaId <= 0) {
      throw new Error('ID da sala é obrigatório!');
    }

    if (!inicio || !fim) {
      throw new Error('Horários de início e fim são obrigatórios!');
    }

    if (inicio >= fim) {
      throw new Error('Horário de início deve ser anterior ao fim!');
    }

    if (inicio < new Date()) {
      throw new Error('Não é possível reservar para datas passadas!');
    }

    // Verificar se a reserva não ultrapassa 8 horas
    const diferencaHoras = (fim.getTime() - inicio.getTime()) / (1000 * 60 * 60);
    if (diferencaHoras > 8) {
      throw new Error('Reserva não pode ultrapassar 8 horas!');
    }

    // Verificar conflitos de agenda da pessoa
    const conflitoPessoa = await this.reservaRepository.temConflitoPessoa(pessoaId, inicio, fim);
    if (conflitoPessoa) {
      throw new Error('Pessoa já possui reserva nesse horário!');
    }

    // Verificar se a sala já está ocupada
    const conflitoSala = await this.reservaRepository.temConflitoSala(salaId, inicio, fim);
    if (conflitoSala) {
      throw new Error('Sala já está ocupada nesse horário!');
    }

    // Criar a reserva após todas as validações
    return this.reservaRepository.criar(pessoaId, salaId, inicio, fim);
  }

  async listarReservas() {
    return this.reservaRepository.listarTodos();
  }

  async buscarReservasPorPessoa(pessoaId: number) {
    if (!pessoaId || pessoaId <= 0) {
      throw new Error('ID da pessoa é obrigatório!');
    }
    
    return this.reservaRepository.buscarPorPessoa(pessoaId);
  }
}