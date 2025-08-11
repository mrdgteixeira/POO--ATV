import { Request, Response } from 'express';
import { PessoaService } from '../services/pessoaService';

const pessoaService = new PessoaService();

export async function criarPessoa(req: Request, res: Response) {
  try {
    const { nome, email } = req.body;
    const pessoa = await pessoaService.criarPessoa(nome, email);
    res.status(201).json(pessoa);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function listarPessoas(req: Request, res: Response) {
  try {
    const pessoas = await pessoaService.listarPessoas();
    res.json(pessoas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}





