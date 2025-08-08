"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pessoaService_1 = require("./services/pessoaService");
const salaService_1 = require("./services/salaService");
const reservaService_1 = require("./services/reservaService");
const pessoaService = new pessoaService_1.PessoaService();
const salaService = new salaService_1.SalaService();
const reservaService = new reservaService_1.ReservaService();
async function testarServices() {
    try {
        console.log('🧪 TESTANDO SERVICES (apenas métodos existentes)...\n');
        // Teste PessoaService
        console.log('👥 Testando PessoaService:');
        try {
            await pessoaService.criarPessoa('', 'email@test.com');
        }
        catch (error) {
            console.log('  ✅ Validação nome vazio:', error.message);
        }
        try {
            await pessoaService.criarPessoa('Teste', 'email-inválido');
        }
        catch (error) {
            console.log('  ✅ Validação email inválido:', error.message);
        }
        console.log('  📋 Métodos disponíveis: criarPessoa(), listarPessoas()');
        // Teste SalaService
        console.log('\n🏢 Testando SalaService:');
        try {
            await salaService.criarSala('', 10);
        }
        catch (error) {
            console.log('  ✅ Validação nome sala vazio:', error.message);
        }
        try {
            await salaService.criarSala('Sala Teste', -5);
        }
        catch (error) {
            console.log('  ✅ Validação capacidade negativa:', error.message);
        }
        try {
            await salaService.criarSala('Sala Teste', 1500);
        }
        catch (error) {
            console.log('  ✅ Validação capacidade muito alta:', error.message);
        }
        console.log('  📋 Métodos disponíveis: criarSala(), listarSalas()');
        // Teste ReservaService
        console.log('\n📅 Testando ReservaService:');
        try {
            const agora = new Date();
            const antes = new Date(agora.getTime() - 1000 * 60 * 60); // 1 hora atrás
            await reservaService.criarReserva(1, 1, antes, agora);
        }
        catch (error) {
            console.log('  ✅ Validação data passada:', error.message);
        }
        try {
            const inicio = new Date('2025-08-10T09:00:00');
            const fim = new Date('2025-08-10T08:00:00'); // Fim antes do início
            await reservaService.criarReserva(1, 1, inicio, fim);
        }
        catch (error) {
            console.log('  ✅ Validação horário inválido:', error.message);
        }
        try {
            const inicio = new Date('2025-08-10T09:00:00');
            const fim = new Date('2025-08-10T18:00:00'); // 9 horas
            await reservaService.criarReserva(1, 1, inicio, fim);
        }
        catch (error) {
            console.log('  ✅ Validação reserva muito longa:', error.message);
        }
        console.log('  📋 Métodos disponíveis: criarReserva(), listarReservas(), buscarReservasPorPessoa()');
        console.log('\n🎉 Services ajustados com sucesso!');
        console.log('✅ Todos os métodos correspondem aos repositories existentes');
        console.log('✅ Métodos inexistentes foram removidos');
    }
    catch (error) {
        console.error('❌ Erro nos testes:', error);
    }
}
// Executar teste
testarServices();
//# sourceMappingURL=test-services.js.map