export declare class ReservaService {
    private reservaRepository;
    criarReserva(pessoaId: number, salaId: number, inicio: Date, fim: Date): Promise<{
        id: number;
        fim: Date;
        inicio: Date;
        pessoaId: number;
        salaId: number;
    }>;
    listarReservas(): Promise<({
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
    buscarReservasPorPessoa(pessoaId: number): Promise<({
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
//# sourceMappingURL=service.d.ts.map