import { Request, Response } from 'express';
import { ReservaRepository } from '../repository/reservaRepository';

const reservaRepository = new ReservaRepository();

export async function criarReserva(req: Request, res: Response) {
  try {
    const { pessoaId, salaId, inicio, fim } = req.body;
    
    const reserva = await reservaRepository.criar(pessoaId, salaId, new Date(inicio), new Date(fim));
    res.status(201).json(reserva);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function listarReservas(req: Request, res: Response) {
  try {
    const reservas = await reservaRepository.listarTodos();
    res.json(reservas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


export async function buscarReservasPorPessoa(req: Request, res: Response) {
  try {
    const { pessoaId } = req.params;
    const reservas = await reservaRepository.buscarPorPessoa(Number(pessoaId));
    res.json(reservas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}





