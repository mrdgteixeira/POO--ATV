export declare class ReservaRepository {
    temConflito(pessoaId: number, inicio: Date, fim: Date): Promise<boolean>;
    criar(pessoaId: number, salaId: number, inicio: Date, fim: Date): Promise<{
        id: number;
        pessoaId: number;
        salaId: number;
        inicio: Date;
        fim: Date;
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
        pessoaId: number;
        salaId: number;
        inicio: Date;
        fim: Date;
    })[]>;
    buscarPorId(id: number): Promise<({
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
        pessoaId: number;
        salaId: number;
        inicio: Date;
        fim: Date;
    }) | null>;
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
        pessoaId: number;
        salaId: number;
        inicio: Date;
        fim: Date;
    })[]>;
    buscarPorSala(salaId: number): Promise<({
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
        pessoaId: number;
        salaId: number;
        inicio: Date;
        fim: Date;
    })[]>;
    atualizar(id: number, dados: {
        pessoaId?: number;
        salaId?: number;
        inicio?: Date;
        fim?: Date;
    }): Promise<{
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
        pessoaId: number;
        salaId: number;
        inicio: Date;
        fim: Date;
    }>;
    deletar(id: number): Promise<{
        id: number;
        pessoaId: number;
        salaId: number;
        inicio: Date;
        fim: Date;
    }>;
}
//# sourceMappingURL=reservaRepository.d.ts.map