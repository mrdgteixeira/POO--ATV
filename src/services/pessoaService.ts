import { PessoaRepository } from '../repository/pessoaRepository';

export class PessoaService {
  private pessoaRepository = new PessoaRepository();

  async criarPessoa(nome: string, email: string) {
    if (!nome || nome.trim().length === 0) {
      throw new Error('Nome é obrigatório!');
    }

    if (!email || email.trim().length === 0) {
      throw new Error('Email é obrigatório!');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email deve ter um formato válido!');
    }

    try {
      return await this.pessoaRepository.criar(nome.trim(), email.toLowerCase());
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new Error('Email já está sendo usado por outra pessoa!');
      }
      throw error;
    }
  }

  async listarPessoas() {
    return this.pessoaRepository.listarTodos();
  }
}
