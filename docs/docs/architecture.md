
# Arquitetura

## Visão Geral
Este projeto é uma aplicação backend construída com **NestJS** utilizando uma arquitetura modular. Ele incorpora várias funcionalidades, como APIs RESTful, microserviços Kafka, Redis para caching e Prisma ORM para gerenciamento do banco de dados. O projeto foi projetado para ser escalável, testável e implantável usando Docker e Kubernetes.

---

## Componentes Principais

### 1. **Módulos**
A aplicação está estruturada em vários módulos, cada um com uma responsabilidade distinta:

- **Módulo de Usuários**: Gerencia usuários, incluindo operações CRUD e eventos de usuários baseados em Kafka.
- **Módulo de Logging**: Registro centralizado de atividades da aplicação.
- **Módulo de Monitoramento**: Fornece verificações de saúde do sistema e métricas.

### 2. **Camada Comum**
Componentes reutilizáveis compartilhados em toda a aplicação:

- **DTOs**: Objetos de transferência de dados para validação de requisições e tipagem de dados.
- **Enums**: Enumerações para constantes compartilhadas, como tópicos Kafka e tipos de usuários.
- **Interceptores**: Interceptores de logging e requisições para aprimorar funcionalidades.
- **Middleware**: Middleware personalizado para inspeção de requisições.

### 3. **Caching**
O Redis é usado para caching, reduzindo a carga no banco de dados e melhorando os tempos de resposta. O mecanismo de caching está integrado utilizando o módulo `@nestjs/cache-manager`.

### 4. **Banco de Dados**
O Prisma ORM é usado para gerenciar o banco de dados PostgreSQL. O esquema do banco de dados é definido em `prisma/schema.prisma`, e as migrações são aplicadas usando o CLI do Prisma.

### 5. **Mensageria**
O Kafka está integrado para comunicação orientada a eventos. A aplicação atua como produtora e consumidora, permitindo o processamento assíncrono de dados.

---

## Decisões Arquiteturais

- **Desacoplamento:** Camadas separadas permitem atualizações independentes.
- **Tecnologia de Banco de Dados:** PostgreSQL escolhido pela flexibilidade e desempenho em dados semi-estruturados.
- **Orquestração:** Kubernetes garante resiliência e escalabilidade.

---

## Escalabilidade

**Horizontal:**

- Kubernetes Horizontal Pod Autoscaler (HPA) ajusta automaticamente os pods com base no uso de CPU ou métricas personalizadas.

**Vertical:**

- PostgreSQL configurado com recursos otimizados (memória e conexões) para suportar grandes volumes.

---

## Estrutura do Projeto

```
src/
├── common/                       # Utilitários compartilhados
│   ├── dto/                      # Objetos de Transferência de Dados
│   ├── enum/                     # Enumerações
│   ├── filters/                  # Filtros de exceção
│   ├── interceptors/             # Interceptores de logging e requisições
│   ├── interfaces/               # Interfaces compartilhadas
│   ├── middleware/               # Componentes middleware
├── prisma/                       # Configuração do banco de dados
│   ├── prisma.module.ts          # Módulo Prisma
│   ├── prisma.service.ts         # Serviço Prisma
│   └── schema.prisma             # Esquema Prisma
├── resources/                    # Módulos específicos de funcionalidades
│   ├── user/                     # Módulo de usuários
│   ├── logging/                  # Módulo de logging
│   └── monitoring/               # Módulo de monitoramento
├── validations/                  # Lógica de validação
├── main.ts                       # Ponto de entrada da aplicação
├── microservice.ts               # Ponto de entrada do microserviço
```

---

## Fluxo de Comunicação

### API REST
A aplicação expõe endpoints RESTful para gerenciamento de usuários e monitoramento do sistema. Os controladores na pasta `resources` lidam com as requisições HTTP e as encaminham para os serviços correspondentes.

### Eventos Kafka
O arquivo `user-kafka-consumer.controller.ts` lida com eventos Kafka, como criação e atualização de usuários, permitindo o processamento em tempo real e integração com outros sistemas.

---

## Arquitetura de Implantação
A aplicação é containerizada usando Docker e orquestrada com Kubernetes para escalabilidade. Consulte `deployment.md` para etapas detalhadas de implantação.

---

## Considerações Finais

Esta arquitetura garante desempenho, manutenção e escalabilidade. Pode ser adaptada para incluir tecnologias como monitoramento (Prometheus/Grafana).
