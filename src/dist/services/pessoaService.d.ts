export declare class PessoaService {
    private pessoaRepository;
    criarPessoa(nome: string, email: string): Promise<{
        nome: string;
        email: string;
        id: number;
    }>;
    listarPessoas(): Promise<{
        nome: string;
        email: string;
        id: number;
    }[]>;
}
//# sourceMappingURL=pessoaService.d.ts.map