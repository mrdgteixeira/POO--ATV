import { Request, Response } from 'express';
export declare function criarSala(req: Request, res: Response): Promise<void>;
export declare function listarSalas(req: Request, res: Response): Promise<void>;
export declare function buscarSalaPorId(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function atualizarSala(req: Request, res: Response): Promise<void>;
export declare function deletarSala(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=salaController.d.ts.map