# Arquitetura do Microsserviço

## Visão Geral da Arquitetura

O microsserviço segue uma arquitetura em camadas que promove separação de responsabilidades, escalabilidade e facilidade de manutenção. A arquitetura foi projetada para garantir alta disponibilidade, baixa latência e suporte para altos volumes de dados.

---

## Camadas do Microsserviço

### 1. Camada de API

**Funções:**

- Lidar com solicitações HTTP (POST e GET).
- Realizar validação inicial de dados JSON usando bibliotecas como `Swagger`.
- Enviar respostas apropriadas com códigos de status HTTP.

**Tecnologias:**

- **Framework:** NestJs (Node.js) - Um framework progressivo para Node.js, projetado para construir aplicações server-side eficientes, confiáveis e escaláveis.
- **Validação:** JSON Schema (class-validator) - A seção de validação utiliza JSON Schema em conjunto com a biblioteca class-validator para garantir a conformidade dos dados..
- **Documentação:** Swagger - Utilizado para gerar e visualizar a documentação da API de forma interativa, facilitando o entendimento e a integração com outros serviços.

---

### 2. Camada de Serviço

**Funções:**

- Encapsular a lógica de negócios.
- Realizar transformações necessárias nos dados antes de armazená-los ou retorná-los.
- Implementar regras de validação e consistência.

**Tecnologias:**

- Implementado como um serviço em Node.js com arquitetura modular.
- Dependências: `class-validator` para validação adicional e `axios` para integrações externas (se necessário).

---

### 3. Camada de Banco de Dados

**Funções:**

- Armazenar e recuperar dados JSON estruturados.
- Garantir consistência e desempenho em alta escala.

**Tecnologia Escolhida:**

- **Framework:** Prisma ORM - Um ORM de próxima geração para Node.js e TypeScript que fornece um cliente de banco de dados com segurança de tipos.
- **Banco de Dados:** PostgreSQL.
- **Justificativa:**
  - Suporte a JSON com campos JSONB para operações rápidas.
  - Forte consistência transacional.
  - Ferramentas robustas para indexação e otimização de consultas.

**Alternativa:**

- MongoDB para cenários com dados altamente não estruturados e consultas flexíveis.

---

## Fluxo de Dados

1. **POST /data**:

   - O cliente envia uma carga JSON para a API.
   - A camada de API valida os dados e os encaminha para a camada de serviço.
   - A camada de serviço aplica a lógica de negócios e persiste os dados no banco de dados.

2. **GET /data**:
   - A API recebe a solicitação de consulta.
   - A camada de serviço consulta o banco de dados e aplica filtros, se necessário.
   - Os dados são retornados ao cliente.

---

## Diagramas

- **Arquitetura em Camadas:**
  - Inclui API, serviço e banco de dados com integrações claras.
- **Fluxo de Dados:**
  - Mostra o caminho dos dados desde a solicitação do cliente até a resposta.

Os diagramas podem ser encontrados no diretório `/diagrams`.

---

## Escalabilidade

**Horizontal:**

- Kubernetes Horizontal Pod Autoscaler (HPA) ajusta automaticamente os pods com base no uso de CPU ou métricas personalizadas.

**Vertical:**

- PostgreSQL configurado com recursos otimizados (memória e conexões) para suportar grandes volumes.

**Caching:**

- Implementar Redis para reduzir carga em consultas frequentes.

---

## Decisões Arquiteturais

- **Desacoplamento:** Camadas separadas permitem atualizações independentes.
- **Tecnologia de Banco de Dados:** PostgreSQL escolhido pela flexibilidade e desempenho em dados semi-estruturados.
- **Orquestração:** Kubernetes garante resiliência e escalabilidade.

---

## Estrutura do Projeto

src/
├── common/                                   # Elementos reutilizáveis e utilitários
│   ├── dto/                                  # DTOs compartilhados
│   │   └── kafka-response.dto.ts             # Resposta padrão para Kafka
│   ├── enum/                                 # Enums compartilhados
│   │   ├── kafka-topics.enum.ts              # Tópicos Kafka padronizados
│   │   ├── logging-index.enum.ts             # Enum para índices de logging
│   │   └── user-role.enum.ts                 # Enum para tipos de usuário
│   ├── filters/                              # Filtros globais
│   │   └── http-exception.filter.ts          # Filtro para exceções HTTP
│   ├── interceptors/                         # Interceptadores globais
│   │   ├── logging/                          # Interceptadores de logging
│   │   │   ├── logging.interceptor.ts        # Interceptador de logging
│   │   │   └── logging.interceptor.spec.ts   # Testes
│   │   ├── request/                          # Interceptadores de requisição
│   │   │   ├── request.interceptor.ts        # Inspeciona requisições
│   │   │   └── request.interceptor.spec.ts   # Testes
│   ├── interfaces/                           # Interfaces compartilhadas
│   │   └── kafka-response.interface.ts       # Interface para respostas Kafka
│   ├── middleware/                           # Middlewares globais
│   │   └── inspect-request.middleware.ts     # Middleware de inspeção de requests
├── i18n/                                     # Internacionalização
│   ├── en_US/                                # Traduções em inglês (EUA)
│   ├── es_ES/                                # Traduções em espanhol
│   └── pt_BR/                                # Traduções em português
├── prisma/                                   # Configuração e conexão com banco de dados
│   ├── prisma.module.ts                      # Módulo do Prisma
│   ├── prisma.service.ts                     # Serviço do Prisma
│   └── schema.prisma                         # Esquema do Prisma (opcional)
├── resources/                                # Recursos organizados por domínio
│   ├── logging/                              # Domínio de logging
│   │   ├── dto/                              # DTOs específicos para logging
│   │   │   ├── create-logging.dto.ts
│   │   │   └── update-logging.dto.ts
│   │   ├── entities/                         # Entidades do domínio
│   │   │   └── logging.entity.ts
│   │   ├── logging.controller.ts             # Controlador para API REST
│   │   ├── logging.service.ts                # Serviço para lógica de negócios
│   │   └── logging.module.ts                 # Módulo de logging
│   ├── monitoring/                           # Domínio de monitoramento
│   │   ├── monitoring.controller.ts          # Controlador de monitoramento
│   │   ├── monitoring.service.ts             # Serviço de monitoramento
│   │   └── monitoring.module.ts              # Módulo de monitoramento
│   ├── user/                                 # Domínio de usuários
│   │   ├── dto/                              # DTOs específicos para usuários
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── entities/                         # Entidades do domínio
│   │   │   └── user.entity.ts
│   │   ├── user.controller.ts                # API REST para gerenciamento de usuários
│   │   ├── user-kafka-consumer.controller.ts # Consumidor Kafka para usuários
│   │   ├── user.service.ts                   # Serviço de lógica para usuários
│   │   └── user.module.ts                    # Módulo de usuários
├── validations/                              # Validações e schemas
│   ├── app.module.ts                         # Configuração do módulo principal
│   ├── main.api.ts                           # Ponto de entrada para API REST
│   └── main.microservice.ts                  # Ponto de entrada para microserviço Kafka Consumer
├── test/                                     # Testes globais

---

## Considerações Finais

Esta arquitetura garante desempenho, manutenção e escalabilidade. Pode ser adaptada para incluir tecnologias como mensageria (RabbitMQ/Kafka) e monitoramento (Prometheus/Grafana).
