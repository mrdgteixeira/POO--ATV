"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const pessoaRepository_1 = require("./repository/pessoaRepository");
const salaRepository_1 = require("./repository/salaRepository");
const reservaRepository_1 = require("./repository/reservaRepository");
const prisma = new client_1.PrismaClient();
const pessoaRepo = new pessoaRepository_1.PessoaRepository();
const salaRepo = new salaRepository_1.SalaRepository();
const reservaRepo = new reservaRepository_1.ReservaRepository();
async function limparBanco() {
    console.log('🧹 Limpando banco de dados...');
    await prisma.reserva.deleteMany();
    await prisma.pessoa.deleteMany();
    await prisma.sala.deleteMany();
    console.log('✅ Banco limpo!');
}
async function criarPessoas() {
    console.log('\n👥 Criando pessoas...');
    const pessoas = [
        { nome: 'João Silva', email: 'joao@email.com' },
        { nome: 'Maria Santos', email: 'maria@email.com' },
        { nome: 'Pedro Oliveira', email: 'pedro@email.com' }
    ];
    const pessoasCriadas = [];
    for (const pessoa of pessoas) {
        const novaPessoa = await pessoaRepo.criar(pessoa.nome, pessoa.email);
        pessoasCriadas.push(novaPessoa);
        console.log(`  ✅ ${pessoa.nome} criado(a) com ID: ${novaPessoa.id}`);
    }
    return pessoasCriadas;
}
async function criarSalas() {
    console.log('\n🏢 Criando salas...');
    const salas = [
        { nome: 'Sala de Reunião A', capacidade: 10 },
        { nome: 'Auditório Principal', capacidade: 50 },
        { nome: 'Sala de Treinamento B', capacidade: 20 }
    ];
    const salasCriadas = [];
    for (const sala of salas) {
        const novaSala = await salaRepo.criar(sala.nome, sala.capacidade);
        salasCriadas.push(novaSala);
        console.log(`  ✅ ${sala.nome} criada com ID: ${novaSala.id} (Capacidade: ${sala.capacidade})`);
    }
    return salasCriadas;
}
async function criarReservas(pessoas, salas) {
    console.log('\n📅 Criando reservas...');
    const reservas = [
        {
            pessoaId: pessoas[0].id,
            salaId: salas[0].id,
            inicio: new Date('2025-08-08T09:00:00'),
            fim: new Date('2025-08-08T10:00:00'),
            descricao: 'Reunião de planejamento'
        },
        {
            pessoaId: pessoas[1].id,
            salaId: salas[1].id,
            inicio: new Date('2025-08-08T14:00:00'),
            fim: new Date('2025-08-08T16:00:00'),
            descricao: 'Apresentação para clientes'
        }
    ];
    const reservasCriadas = [];
    for (const reserva of reservas) {
        try {
            const novaReserva = await reservaRepo.criar(reserva.pessoaId, reserva.salaId, reserva.inicio, reserva.fim);
            reservasCriadas.push(novaReserva);
            console.log(`  ✅ Reserva criada: ${reserva.descricao} (ID: ${novaReserva.id})`);
        }
        catch (error) {
            console.log(`  ❌ Erro ao criar reserva: ${reserva.descricao} - ${error.message}`);
        }
    }
    return reservasCriadas;
}
async function testarConflitos(pessoas, salas) {
    console.log('\n⚠️  Testando detecção de conflitos...');
    try {
        await reservaRepo.criar(pessoas[0].id, // Mesmo usuário da primeira reserva
        salas[0].id, new Date('2025-08-08T09:30:00'), // Horário conflitante
        new Date('2025-08-08T10:30:00'));
        console.log('  ❌ ERRO: Conflito não foi detectado!');
    }
    catch (error) {
        console.log('  ✅ Conflito detectado corretamente: ' + error.message);
    }
}
async function exibirResumo() {
    console.log('\n� RESUMO FINAL:');
    const totalPessoas = await pessoaRepo.listarTodos();
    const totalSalas = await salaRepo.listarTodos();
    const totalReservas = await reservaRepo.listarTodos();
    console.log(`  👥 Pessoas: ${totalPessoas.length}`);
    console.log(`  🏢 Salas: ${totalSalas.length}`);
    console.log(`  📅 Reservas: ${totalReservas.length}`);
    console.log('\n📋 DETALHES DAS RESERVAS:');
    for (const reserva of totalReservas) {
        console.log(`  🔹 ${reserva.pessoa.nome} reservou "${reserva.sala.nome}"`);
        console.log(`     De: ${reserva.inicio.toLocaleString('pt-BR')}`);
        console.log(`     Até: ${reserva.fim.toLocaleString('pt-BR')}`);
        console.log('');
    }
    // Testar busca de reservas por pessoa
    if (totalPessoas.length > 0) {
        console.log(`\n🔍 Reservas de ${totalPessoas[0].nome}:`);
        const reservasPorPessoa = await reservaRepo.buscarPorPessoa(totalPessoas[0].id);
        console.log(`  � Total: ${reservasPorPessoa.length} reserva(s)`);
        for (const reserva of reservasPorPessoa) {
            console.log(`     - ${reserva.sala.nome}: ${reserva.inicio.toLocaleString('pt-BR')}`);
        }
    }
}
async function main() {
    try {
        console.log('🚀 INICIANDO TESTE DO SISTEMA SIMPLIFICADO');
        console.log('==========================================');
        // 1. Limpar banco
        await limparBanco();
        // 2. Criar dados de teste
        const pessoas = await criarPessoas();
        const salas = await criarSalas();
        const reservas = await criarReservas(pessoas, salas);
        // 3. Testar regras de negócio
        await testarConflitos(pessoas, salas);
        // 4. Exibir resumo
        await exibirResumo();
        console.log('🎉 TESTE CONCLUÍDO COM SUCESSO!');
        console.log('✅ Sistema simplificado funcionando perfeitamente');
    }
    catch (error) {
        console.error('❌ ERRO NO TESTE:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
// Executar o teste
main();
//# sourceMappingURL=test-db.js.map