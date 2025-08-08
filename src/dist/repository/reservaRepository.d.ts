export declare class ReservaRepository {
    temConflito(pessoaId: number, inicio: Date, fim: Date): Promise<boolean>;
    criar(pessoaId: number, salaId: number, inicio: Date, fim: Date): Promise<{
        id: number;
        fim: Date;
        inicio: Date;
        pessoaId: number;
        salaId: number;
    }>;
    listarTodos(): Promise<({
        pessoa: {
            nome: string;
            email: string;
            id: number;
        };
        sala: {
            nome: string;
            id: number;
            capacidade: number;
        };
    } & {
        id: number;
        fim: Date;
        inicio: Date;
        pessoaId: number;
        salaId: number;
    })[]>;
    buscarPorPessoa(pessoaId: number): Promise<({
        pessoa: {
            nome: string;
            email: string;
            id: number;
        };
        sala: {
            nome: string;
            id: number;
            capacidade: number;
        };
    } & {
        id: number;
        fim: Date;
        inicio: Date;
        pessoaId: number;
        salaId: number;
    })[]>;
}
//# sourceMappingURL=reservaRepository.d.ts.map