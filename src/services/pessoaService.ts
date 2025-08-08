import { PessoaRepository } from '../repository/pessoaRepository';

export class PessoaService {
  private pessoaRepository = new PessoaRepository();

  async criarPessoa(nome: string, email: string) {
    // Validações básicas
    if (!nome || nome.trim().length === 0) {
      throw new Error('Nome é obrigatório!');
    }

    if (!email || email.trim().length === 0) {
      throw new Error('Email é obrigatório!');
    }

    // Validação de formato de email básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email deve ter um formato válido!');
    }

    // Deixar Prisma lidar com a constraint de email único
    try {
      return await this.pessoaRepository.criar(nome.trim(), email.toLowerCase());
    } catch (error: any) {
      // Se for erro de constraint único, dar mensagem amigável
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new Error('Email já está sendo usado por outra pessoa!');
      }
      throw error; // Re-throw outros erros
    }
  }

  async listarPessoas() {
    return this.pessoaRepository.listarTodos();
  }
}
