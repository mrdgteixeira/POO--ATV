import { Request, Response } from 'express';
export declare function criarPessoa(req: Request, res: Response): Promise<void>;
export declare function listarPessoas(req: Request, res: Response): Promise<void>;
export declare function buscarPessoaPorId(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function atualizarPessoa(req: Request, res: Response): Promise<void>;
export declare function deletarPessoa(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=pessoaController.d.ts.map