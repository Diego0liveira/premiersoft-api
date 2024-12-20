# Projeto: Sistema de Integração com Kafka e REST API

## Visão Geral
Este projeto implementa um sistema backend robusto usando **NestJS** que oferece comunicação bidirecional via **Kafka** e **REST API**. A arquitetura foi projetada para ser escalável, modular e extensível, atendendo a requisitos modernos de integração entre sistemas.

---

## 💡 Recursos de Arquitetura e Boas Práticas

1. **Arquitetura em Camadas**: API, serviço e banco de dados são desacoplados para manutenção e escalabilidade.
2. **Orquestração com Kubernetes**: Oferece escalabilidade automática e alta disponibilidade.
3. **Docker**: Contêinerização para desenvolvimento e produção.
4. **Pipeline CI/CD**: Integração contínua para testes, conteinerização e implantação automatizada.
5. **SOLID**: Design modular e orientado a responsabilidade única.
6. **Prisma ORM**: Abstração e segurança ao acessar o banco de dados.
7. **Elasticsearch**: Monitoramento centralizado e detalhado de logs para auditoria e depuração.
8. **Integração Kafka**: Comunicação assíncrona eficiente para serviços externos.
9. **REST API**: Endpoints RESTful para gerenciar recursos, como usuários.
10. **Cache com Redis**: Redução da carga em consultas frequentes usando Redis como camada de cache.
11. **PostgreSQL**: Escolhido pela combinação de consistência, escalabilidade e suporte às consultas relacionais.
12. **Validação de Dados**: Utiliza-se bibliotecas como class-validator para validar entradas de forma eficiente

O design considera desempenho (tempo de resposta de até 500ms), escalabilidade para bilhões de registros e alta disponibilidade.

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

## 🚀 Tecnologias Utilizadas

- ![NestJS](https://img.icons8.com/color/48/nestjs.png) **NestJS**
- ![Prisma ORM](https://img.icons8.com/color/48/prisma.png) **Prisma ORM**
- ![PostgreSQL](https://img.icons8.com/fluency/48/postgresql.png) **PostgreSQL**
- ![Docker](https://img.icons8.com/fluency/48/docker.png) **Docker**
- ![Elasticsearch](https://img.icons8.com/color/48/elasticsearch.png) **Elasticsearch**
- ![Swagger](https://img.icons8.com/color/48/swagger.png) **Swagger**
- ![Kubernetes](https://img.icons8.com/color/48/kubernetes.png) **Kubernetes**
- ![Codecov](https://img.icons8.com/color/48/codecov.png) **Codecov**
- ![Redis](https://img.icons8.com/color/48/redis.png) **Redis**
- ![Kafka](https://img.icons8.com/fluency/48/kafka.png) **Kafka**

---

## Pré-requisitos

Certifique-se de ter os seguintes componentes instalados:
- **Node.js**: versão 18 ou superior
- **Docker**: versão 20.10 ou superior
- **Docker Compose**: versão 1.29 ou superior
- **Redis** e **Kafka**: configurados e funcionando

---

## 🛠️ Funcionalidades

### Usuários

- **Criar usuário**:
  - Endpoint: POST /users
  - Corpo:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "admin"
    }
    ```

- **Listar todos os usuários**:
  - Endpoint: GET /users

- **Buscar usuário por ID**:
  - Endpoint: GET /users/:id

- **Atualizar usuário**:
  - Endpoint: PUT /users/:id
  - Corpo:
    ```json
    {
      "name": "John Updated",
      "role": "client"
    }
    ```

- **Filtrar usuários por campo**:
  - Endpoint: GET /users/filter?field=email&value=john.doe@example.com

### Kafka Consumer

- **Criar usuário via Kafka**:
  - Evento Kafka: `USER_CREATED`
  - Corpo da mensagem:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "admin"
    }
    ```

- **Atualizar usuário via Kafka**:
  - Evento Kafka: `USER_UPDATED`
  - Corpo da mensagem:
    ```json
    {
      "id": 1,
      "name": "John Updated",
      "email": "john.updated@example.com",
      "role": "client"
    }
    ```

- **Obter todos os usuários via Kafka**:
  - Evento Kafka: `GET_USERS`
  - Retorno: Lista de usuários.

- **Buscar usuário por ID via Kafka**:
  - Evento Kafka: `GET_USER`
  - Corpo da mensagem:
    ```json
    {
      "id": 1
    }
    ```

- **Deletar usuário via Kafka**:
  - Evento Kafka: `USER_DELETED`
  - Corpo da mensagem:
    ```json
    {
      "id": 1
    }
    ```

### Logs

- Todos os logs de requisição/resposta são registrados no Elasticsearch.

- Elasticsearch: [http://elasticsearch:9200](http://elasticsearch:9200)
- Kibana: [http://localhost:5601](http://localhost:5601)

### Monitoramento

- **Health Check**:
  - Endpoint: GET /health
  - Retorna o status do banco de dados e outros serviços.

### 📚 Documentação com Swagger

- A API está documentada com **Swagger**:
- Acesse [http://localhost:3000/api](http://localhost:3000/api) para visualizar e testar a API via Swagger.

---

## Configuração

### 🌐 Variáveis de Ambiente

As variáveis de ambiente necessárias estão listadas no arquivo .env.example. Copie este arquivo para .env e preencha as informações adequadas:

```env
DATABASE_URL=postgresql://<usuario>:<senha>@localhost:5432/<banco>
REDIS_HOST=redis
REDIS_PORT=6379
KAFKA_BROKER=kafka:9092
KAFKA_CLIENT_ID=app-client
```

### Instalação
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Gere o cliente Prisma:
   ```bash
   npx prisma generate
   ```
3. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate deploy
   ```

---

## Execução

### Localmente
Execute o sistema localmente com os seguintes comandos:

```bash
# Iniciar o servidor
npm run start:dev
```

### 🐳 Executando com Docker

1. Construa os contêineres:
   ```bash
   docker-compose build
   ```
2. Inicie os serviços:
   ```bash
   docker-compose up
   ```

---

## 🧪 Testes

O projeto inclui testes unitários, de integração e end-to-end:

```bash
# Testes unitários
npm run test:unit

# Testes de integração
npm run test:integration

# Testes end-to-end
npm run test:e2e
```

![Coverage](https://codecov.io/gh/<USERNAME>/<REPOSITORY>/branch/main/graph/badge.svg)

---

## 🤝 Contribuições

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/feature-name`).
3. Faça um commit das suas alterações (`git commit -m 'Add some feature'`).
4. Envie sua branch (`git push origin feature/feature-name`).
5. Abra um Pull Request.

---

## 📜 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
