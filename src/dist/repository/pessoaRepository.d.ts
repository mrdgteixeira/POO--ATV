export declare class PessoaRepository {
    criar(nome: string, email: string): Promise<{
        nome: string;
        email: string;
        id: number;
    }>;
    listarTodos(): Promise<{
        nome: string;
        email: string;
        id: number;
    }[]>;
    buscarPorId(id: number): Promise<{
        nome: string;
        email: string;
        id: number;
    } | null>;
    buscarPorEmail(email: string): Promise<{
        nome: string;
        email: string;
        id: number;
    } | null>;
    atualizar(id: number, dados: {
        nome?: string;
        email?: string;
    }): Promise<{
        nome: string;
        email: string;
        id: number;
    }>;
    deletar(id: number): Promise<{
        nome: string;
        email: string;
        id: number;
    }>;
}
//# sourceMappingURL=pessoaRepository.d.ts.map