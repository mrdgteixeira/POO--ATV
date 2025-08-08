export declare class SalaService {
    private salaRepository;
    criarSala(nome: string, capacidade: number): Promise<{
        nome: string;
        id: number;
        capacidade: number;
    }>;
    listarSalas(): Promise<{
        nome: string;
        id: number;
        capacidade: number;
    }[]>;
}
//# sourceMappingURL=salaService.d.ts.map