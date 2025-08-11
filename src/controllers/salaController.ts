import { Request, Response } from 'express';
import { SalaService } from '../services/salaService';

const salaService = new SalaService();

export async function criarSala(req: Request, res: Response) {
  try {
    const { nome, capacidade } = req.body;
    const sala = await salaService.criarSala(nome, capacidade);
    res.status(201).json(sala);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function listarSalas(req: Request, res: Response) {
  try {
    const salas = await salaService.listarSalas();
    res.json(salas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
 