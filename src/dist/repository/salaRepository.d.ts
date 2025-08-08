export declare class SalaRepository {
    criar(nome: string, capacidade: number): Promise<{
        nome: string;
        id: number;
        capacidade: number;
    }>;
    listarTodos(): Promise<{
        nome: string;
        id: number;
        capacidade: number;
    }[]>;
    buscarPorId(id: number): Promise<{
        nome: string;
        id: number;
        capacidade: number;
    } | null>;
    buscarPorNome(nome: string): Promise<{
        nome: string;
        id: number;
        capacidade: number;
    } | null>;
    atualizar(id: number, dados: {
        nome?: string;
        capacidade?: number;
    }): Promise<{
        nome: string;
        id: number;
        capacidade: number;
    }>;
    deletar(id: number): Promise<{
        nome: string;
        id: number;
        capacidade: number;
    }>;
}
//# sourceMappingURL=salaRepository.d.ts.map