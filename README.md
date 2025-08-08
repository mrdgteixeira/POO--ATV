# 🏢 Sistema de Reservas POO - Padrão Repository

Sistema de reservas de salas desenvolvido em **TypeScript** com **Express.js** e **Prisma ORM**, implementando o padrão **Repository** para separação de responsabilidades.

## 🎯 **Objetivo**

Implementar um sistema que permite:
- ✅ Cadastro de pessoas e salas
- ✅ Criação de reservas com validação de conflitos
- ✅ Regras de negócio: Uma pessoa não pode estar em dois lugares ao mesmo tempo
- ✅ Regras de negócio: Uma sala não pode ser usada por duas pessoas simultaneamente

## 🏗️ **Arquitetura - Padrão Repository**

```
src/
├── app.ts                      # Servidor Express principal
├── controllers/                # Camada de controle HTTP
│   ├── pessoaController.ts
│   ├── salaController.ts
│   └── reservaController.ts
├── repository/                 # Camada de acesso a dados (um arquivo por tabela)
│   ├── pessoaRepository.ts
│   ├── salaRepository.ts
│   └── reservaRepository.ts
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── dev.db                 # SQLite database
└── test-db.ts                 # Script de teste completo
```

## 🗃️ **Banco de Dados**

### Tabela: Pessoa
- `id` (Primary Key)
- `nome` (String)
- `email` (String)

### Tabela: Sala
- `id` (Primary Key)
- `nome` (String)
- `capacidade` (Number)

### Tabela: Reserva
- `id` (Primary Key)
- `pessoaId` (Foreign Key → Pessoa)
- `salaId` (Foreign Key → Sala)
- `inicio` (DateTime)
- `fim` (DateTime)

## 🚀 **Como Executar**

### 1. Instalar dependências
```bash
cd src
npm install
```

### 2. Configurar banco de dados
```bash
npx prisma generate
npx prisma db push
```

### 3. Executar testes
```bash
npm run test-db
```

### 4. Iniciar servidor
```bash
npx tsx app.ts
```

## 🛠️ **API Endpoints**

### Pessoas
- `POST /pessoas` - Criar pessoa
- `GET /pessoas` - Listar pessoas

### Salas
- `POST /salas` - Criar sala
- `GET /salas` - Listar salas

### Reservas
- `POST /reservas` - Criar reserva
- `GET /reservas` - Listar reservas
- `GET /pessoas/:pessoaId/reservas` - Buscar reservas por pessoa

## 🧪 **Testes de Validação**

O script `test-db.ts` valida:

### ✅ **Inserção de Dados**
- Criação de 3 pessoas
- Criação de 3 salas
- Criação de 2 reservas válidas

### ✅ **Regras de Negócio**
1. **Teste 1**: Mesmo usuário, mesma sala, horário conflitante
   - ❌ Deve ser bloqueado: "Pessoa já possui reserva nesse horário!"

2. **Teste 2**: Mesmo usuário, salas diferentes, mesmo horário
   - ❌ Deve ser bloqueado: "Pessoa já possui reserva nesse horário!"

3. **Teste 3**: Usuário diferente, mesma sala, mesmo horário
   - ❌ Deve ser bloqueado: "Sala já está ocupada nesse horário!"

## 📋 **Exemplo de Uso**

```javascript
// Criar pessoa
POST /pessoas
{
  "nome": "João Silva",
  "email": "joao@email.com"
}

// Criar sala
POST /salas
{
  "nome": "Sala de Reunião A",
  "capacidade": 10
}

// Criar reserva
POST /reservas
{
  "pessoaId": 1,
  "salaId": 1,
  "inicio": "2025-08-08T09:00:00",
  "fim": "2025-08-08T10:00:00"
}
```

## 🎯 **Tecnologias Utilizadas**

- **TypeScript** - Linguagem principal
- **Express.js** - Framework web
- **Prisma ORM** - Object-Relational Mapping
- **SQLite** - Banco de dados
- **tsx** - Executor TypeScript

## ✨ **Características Implementadas**

- ✅ **Padrão Repository**: Um arquivo por tabela do banco
- ✅ **Validação de Conflitos**: Detecção automática de sobreposições
- ✅ **Relacionamentos**: Dados carregados com `include`
- ✅ **Testes Automatizados**: Script completo de validação
- ✅ **Separação de Responsabilidades**: Controllers → Repositories → Database

---

**Desenvolvido para disciplina de Programação Orientada a Objetos** 🎓

## Resumo da Refatoração

O código foi refatorado seguindo as melhores práticas de arquitetura, separando as responsabilidades em:

### 📁 Estrutura de Pastas

```
src/
├── controllers/           # Controladores para cada entidade
│   ├── pessoaController.ts
│   ├── salaController.ts
│   ├── reservaController.ts
│   └── index.ts
├── repository/           # Repositórios para acesso a dados
│   ├── pessoaRepository.ts
│   ├── salaRepository.ts
│   ├── reservaRepository.ts
│   └── index.ts
├── services/            # Serviços com lógica de negócio
│   └── service.ts
├── prisma/             # Configuração do banco de dados
│   ├── schema.prisma
│   ├── dev.db
│   └── migrations/
├── app.ts              # Arquivo principal da aplicação
├── package.json
└── tsconfig.json
```

### 🗂️ Separação por Entidade

#### 1. **PessoaRepository** (`repository/pessoaRepository.ts`)
- `criar(nome, email)` - Criar nova pessoa
- `listarTodos()` - Listar todas as pessoas
- `buscarPorId(id)` - Buscar pessoa por ID
- `buscarPorEmail(email)` - Buscar pessoa por email
- `atualizar(id, dados)` - Atualizar dados da pessoa
- `deletar(id)` - Deletar pessoa

#### 2. **SalaRepository** (`repository/salaRepository.ts`)
- `criar(nome, capacidade)` - Criar nova sala
- `listarTodos()` - Listar todas as salas
- `buscarPorId(id)` - Buscar sala por ID
- `buscarPorNome(nome)` - Buscar sala por nome
- `atualizar(id, dados)` - Atualizar dados da sala
- `deletar(id)` - Deletar sala

#### 3. **ReservaRepository** (`repository/reservaRepository.ts`)
- `crear(pessoaId, salaId, inicio, fim)` - Criar nova reserva
- `listarTodos()` - Listar todas as reservas (com pessoa e sala)
- `buscarPorId(id)` - Buscar reserva por ID
- `buscarPorPessoa(pessoaId)` - Buscar reservas de uma pessoa
- `buscarPorSala(salaId)` - Buscar reservas de uma sala
- `temConflito(pessoaId, inicio, fim)` - Verificar conflitos de horário
- `atualizar(id, dados)` - Atualizar reserva
- `deletar(id)` - Deletar reserva

### 🎮 Controladores

Cada controlador contém funções para todas as operações CRUD:

#### PessoaController
- `criarPessoa`
- `listarPessoas`
- `buscarPessoaPorId`
- `atualizarPessoa`
- `deletarPessoa`

#### SalaController
- `criarSala`
- `listarSalas`
- `buscarSalaPorId`
- `atualizarSala`
- `deletarSala`

#### ReservaController
- `criarReserva` (com validação de conflitos)
- `listarReservas`
- `buscarReservaPorId`
- `buscarReservasPorPessoa`
- `buscarReservasPorSala`
- `atualizarReserva`
- `deletarReserva`

### 🛣️ Rotas da API

#### Pessoas
- `POST /pessoas` - Criar pessoa
- `GET /pessoas` - Listar pessoas
- `GET /pessoas/:id` - Buscar pessoa por ID
- `PUT /pessoas/:id` - Atualizar pessoa
- `DELETE /pessoas/:id` - Deletar pessoa

#### Salas
- `POST /salas` - Criar sala
- `GET /salas` - Listar salas
- `GET /salas/:id` - Buscar sala por ID
- `PUT /salas/:id` - Atualizar sala
- `DELETE /salas/:id` - Deletar sala

#### Reservas
- `POST /reservas` - Criar reserva
- `GET /reservas` - Listar reservas
- `GET /reservas/:id` - Buscar reserva por ID
- `GET /pessoas/:pessoaId/reservas` - Buscar reservas de uma pessoa
- `GET /salas/:salaId/reservas` - Buscar reservas de uma sala
- `PUT /reservas/:id` - Atualizar reserva
- `DELETE /reservas/:id` - Deletar reserva

### 🚀 Como Executar

1. **Instalar dependências:**
```bash
npm install
```

2. **Gerar o Prisma Client:**
```bash
npm run prisma:generate
```

3. **Compilar TypeScript:**
```bash
npm run build
```

4. **Executar a aplicação:**
```bash
npm start
```

A API rodará na porta 3000: `http://localhost:3000`

### 🔧 Scripts Disponíveis

- `npm start` - Executa a aplicação compilada
- `npm run build` - Compila o TypeScript
- `npm run prisma:generate` - Gera o Prisma Client
- `npm run prisma:migrate` - Executa migrações do banco

### 💡 Vantagens da Refatoração

1. **Separação de Responsabilidades**: Cada arquivo tem uma responsabilidade específica
2. **Reutilização**: Repositórios podem ser reutilizados em diferentes contextos
3. **Manutenibilidade**: Código mais organizado e fácil de manter
4. **Testabilidade**: Cada camada pode ser testada independentemente
5. **Escalabilidade**: Fácil adicionar novas entidades seguindo o mesmo padrão
6. **Tipagem**: TypeScript garante type safety em toda a aplicação

### 📋 Exemplo de Uso

**Criar uma pessoa:**
```bash
curl -X POST http://localhost:3000/pessoas \
  -H "Content-Type: application/json" \
  -d '{"nome": "João Silva", "email": "joao@email.com"}'
```

**Criar uma sala:**
```bash
curl -X POST http://localhost:3000/salas \
  -H "Content-Type: application/json" \
  -d '{"nome": "Sala A1", "capacidade": 20}'
```

**Criar uma reserva:**
```bash
curl -X POST http://localhost:3000/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "pessoaId": 1,
    "salaId": 1,
    "inicio": "2025-08-08T09:00:00Z",
    "fim": "2025-08-08T10:00:00Z"
  }'
```

O sistema agora está completamente modularizado e segue as melhores práticas de arquitetura de software!
