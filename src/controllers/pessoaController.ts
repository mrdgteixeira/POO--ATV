import { Request, Response } from 'express';
import { PessoaRepository } from '../repository/pessoaRepository';

const pessoaRepository = new PessoaRepository();

export async function criarPessoa(req: Request, res: Response) {
  try {
    const { nome, email } = req.body;
    const pessoa = await pessoaRepository.criar(nome, email);
    res.status(201).json(pessoa);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function listarPessoas(req: Request, res: Response) {
  try {
    const pessoas = await pessoaRepository.listarTodos();
    res.json(pessoas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}





