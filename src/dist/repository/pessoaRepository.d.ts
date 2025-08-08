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
}
//# sourceMappingURL=pessoaRepository.d.ts.map