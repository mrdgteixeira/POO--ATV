import { PrismaClient } from '@prisma/client';
import { PessoaRepository } from './repository/pessoaRepository';
import { SalaRepository } from './repository/salaRepository';
import { ReservaRepository } from './repository/reservaRepository';

const prisma = new PrismaClient();

const pessoaRepo = new PessoaRepository();
const salaRepo = new SalaRepository();
const reservaRepo = new ReservaRepository();

async function limparBanco() {
  await prisma.reserva.deleteMany();
  await prisma.pessoa.deleteMany();
  await prisma.sala.deleteMany();
  console.log('🗑️ Banco de dados limpo!');
}

async function criarDadosTeste() {
  console.log('\n📝 Criando dados de teste...');

  const pessoas = [
    await pessoaRepo.criar('João Silva', 'joao@example.com'),
    await pessoaRepo.criar('Maria Santos', 'maria@example.com'),
    await pessoaRepo.criar('Pedro Oliveira', 'pedro@example.com')
  ];

  const salas = [
    await salaRepo.criar('Sala de Reunião A', 10),
    await salaRepo.criar('Auditório', 50),
    await salaRepo.criar('Sala de Treinamento', 20)
  ];

  console.log(`✅ Criadas ${pessoas.length} pessoas e ${salas.length} salas`);

  const reservaValida = await reservaRepo.criar(
    pessoas[0].id,
    salas[0].id,
    new Date('2025-08-08T09:00:00'),
    new Date('2025-08-08T11:00:00')
  );

  console.log('✅ Reserva válida criada:', {
    pessoa: pessoas[0].nome,
    sala: salas[0].nome,
    inicio: '09:00',
    fim: '11:00'
  });

  return { pessoas, salas, reservaValida };
}

async function testarRegrasDeNegocio(pessoas: any[], salas: any[]) {
  console.log('\n🔍 Testando regras de negócio...');

  try {
    await reservaRepo.criar(
      pessoas[0].id,
      salas[0].id,
      new Date('2025-08-08T09:30:00'),
      new Date('2025-08-08T12:00:00')
    );
    console.log('❌ ERRO: Deveria ter impedido conflito de pessoa!');
  } catch (error: any) {
    console.log('✅ Conflito de pessoa detectado:', error.message);
  }

  try {
    await reservaRepo.criar(
      pessoas[0].id,
      salas[1].id,
      new Date('2025-08-08T09:00:00'),
      new Date('2025-08-08T11:00:00')
    );
    console.log('❌ ERRO: Deveria ter impedido conflito de pessoa!');
  } catch (error: any) {
    console.log('✅ Conflito de pessoa detectado:', error.message);
  }

  try {
    await reservaRepo.criar(
      pessoas[1].id,
      salas[0].id,
      new Date('2025-08-08T09:00:00'),
      new Date('2025-08-08T11:00:00')
    );
    console.log('❌ ERRO: Deveria ter impedido conflito de sala!');
  } catch (error: any) {
    console.log('✅ Conflito de sala detectado:', error.message);
  }

  const reservaSemConflito = await reservaRepo.criar(
    pessoas[1].id,
    salas[1].id,
    new Date('2025-08-08T14:00:00'),
    new Date('2025-08-08T16:00:00')
  );

  console.log('✅ Reserva sem conflito criada:', {
    pessoa: pessoas[1].nome,
    sala: salas[1].nome,
    inicio: '14:00',
    fim: '16:00'
  });

  return reservaSemConflito;
}

async function exibirResumo() {
  console.log('\n📊 RESUMO FINAL:');
  
  const pessoas = await pessoaRepo.listarTodos();
  const salas = await salaRepo.listarTodos();
  const reservas = await reservaRepo.listarTodos();

  console.log(`👥 Total de pessoas: ${pessoas.length}`);
  console.log(`🏢 Total de salas: ${salas.length}`);
  console.log(`📅 Total de reservas: ${reservas.length}`);

  const reservasPorPessoa = await reservaRepo.buscarPorPessoa(pessoas[0].id);
  console.log(`📋 Reservas de ${pessoas[0].nome}: ${reservasPorPessoa.length}`);
}

async function executarTeste() {
  try {
    await limparBanco();
    const { pessoas, salas } = await criarDadosTeste();
    await testarRegrasDeNegocio(pessoas, salas);
    await exibirResumo();
    
    console.log('\n🎉 TODOS OS TESTES PASSARAM! 🎉');
  } catch (error) {
    console.error('❌ Erro durante o teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

executarTeste();
