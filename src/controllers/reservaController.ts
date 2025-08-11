import { Request, Response } from 'express';
import { ReservaService } from '../services/reservaService';

const reservaService = new ReservaService();

export async function criarReserva(req: Request, res: Response) {
  try {
    const { pessoaId, salaId, inicio, fim } = req.body;
    
    const reserva = await reservaService.criarReserva(pessoaId, salaId, new Date(inicio), new Date(fim));
    res.status(201).json(reserva);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function listarReservas(req: Request, res: Response) {
  try {
    const reservas = await reservaService.listarReservas();
    res.json(reservas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


export async function buscarReservasPorPessoa(req: Request, res: Response) {
  try {
    const { pessoaId } = req.params;
    const reservas = await reservaService.buscarReservasPorPessoa(Number(pessoaId));
    res.json(reservas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}





