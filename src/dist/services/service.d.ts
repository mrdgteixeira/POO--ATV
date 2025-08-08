export declare class ReservaService {
    private reservaRepository;
    criarReserva(pessoaId: number, salaId: number, inicio: Date, fim: Date): Promise<{
        id: number;
        pessoaId: number;
        salaId: number;
        inicio: Date;
        fim: Date;
    }>;
}
//# sourceMappingURL=service.d.ts.map