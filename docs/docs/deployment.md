
# Implantação

## Visão Geral
Este documento descreve o processo de implantação da aplicação, incluindo containerização, orquestração e configuração de serviços de suporte como Kafka, Redis e PostgreSQL.

---

## Pré-requisitos

1. **Docker**: Certifique-se de que o Docker está instalado e em execução.
2. **Docker Compose**: Necessário para orquestração local de containers.
3. **Kubernetes (opcional)**: Para implantações em nível de produção.
4. **Variáveis de Ambiente**: Defina as variáveis necessárias em um arquivo `.env`.

---

## Implantação Local

### Etapas:
1. **Prepare o Ambiente**
   Certifique-se de que o arquivo `.env` está localizado na raiz do projeto. Exemplo:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@postgres:5432/user_management
   REDIS_HOST=redis
   REDIS_PORT=6379
   ELASTICSEARCH_NODE=http://elasticsearch:9200
   KAFKA_BROKER=localhost:9092
   ```

2. **Inicie os Containers**
   Use o Docker Compose para construir e iniciar os containers:
   ```bash
   docker-compose up --build
   ```

3. **Acesse os Serviços**
   - **API**: http://localhost:3000
   - **Microserviço**: Executa em uma porta separada (ex.: 3001).
   - **PostgreSQL**: Porta `5432`
   - **Redis**: Porta `6379`
   - **Kafka**: Porta `9092`
   - **Elasticsearch**: Porta `9200`
   - **Kibana**: Porta `5601`

---

## Implantação em Produção

### Usando Kubernetes

1. **Prepare os Manifests do Kubernetes**
   - Os arquivos de implantação estão disponíveis em `docs/kubernetes/`:
     - `deployment.yaml`: Define as implantações da aplicação.
     - `service.yaml`: Expõe os serviços.
     - `hpa.yaml`: Configura o escalonamento horizontal automático.

2. **Implante no Kubernetes**
   Aplique os manifests:
   ```bash
   kubectl apply -f docs/kubernetes/deployment.yaml
   kubectl apply -f docs/kubernetes/service.yaml
   kubectl apply -f docs/kubernetes/hpa.yaml
   ```

3. **Monitore a Implantação**
   Verifique o status dos pods e serviços:
   ```bash
   kubectl get pods
   kubectl get services
   ```

### Configuração do Ambiente
- Use um ConfigMap para variáveis de ambiente.
- Exemplo:
  ```yaml
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: app-config
  data:
    DATABASE_URL: "postgresql://postgres:postgres@postgres:5432/user_management"
    REDIS_HOST: "redis"
    REDIS_PORT: "6379"
  ```

---

## Pipeline de CI/CD

### GitHub Actions
O projeto inclui workflows de CI/CD em `.github/workflows`:
- **Build e Testes**: Executa em cada push para validar a aplicação.
- **Imagem Docker**: Constrói e envia imagens Docker para um registro de containers.

### Visão Geral do Pipeline
1. Construa a aplicação.
2. Execute os testes.
3. Construa e marque imagens Docker.
4. Envie as imagens para o registro de containers.
5. Implante no Kubernetes.

---

## Notas Adicionais
- **Logs e Monitoramento**: Use o Kibana para visualizar logs do Elasticsearch.
- **Escalabilidade**: Escaladores horizontais automáticos (HPA) garantem que a aplicação escale conforme a demanda.
- **Migrações de Banco de Dados**: Use o Prisma CLI para aplicar migrações:
  ```bash
  npx prisma migrate deploy
  ```
  
---

## Considerações Finais

Essa estratégia de implantação utiliza práticas modernas para garantir resiliência, escalabilidade e fácil manutenção do microsserviço em ambientes de produção. A integração com ferramentas de monitoramento e escalabilidade automática garante que o serviço possa lidar com altos volumes de tráfego.