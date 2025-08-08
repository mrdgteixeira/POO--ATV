import { Request, Response } from 'express';
import { SalaRepository } from '../repository/salaRepository';

const salaRepository = new SalaRepository();

export async function criarSala(req: Request, res: Response) {
  try {
    const { nome, capacidade } = req.body;
    const sala = await salaRepository.criar(nome, capacidade);
    res.status(201).json(sala);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function listarSalas(req: Request, res: Response) {
  try {
    const salas = await salaRepository.listarTodos();
    res.json(salas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
 