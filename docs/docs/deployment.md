# Estratégia de Implantação do Microsserviço

## Visão Geral

Este documento descreve a estratégia de implantação do microsserviço, abrangendo a conteinerização com Docker, orquestração com Kubernetes e configurações específicas para escalabilidade e alta disponibilidade.

---

## Conteinerização com Docker

### Dockerfile

O `Dockerfile` utilizado no projeto foi projetado para criar imagens leves e seguras. Abaixo está um exemplo do conteúdo:

```Dockerfile
# Imagem base
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY package*.json ./
COPY src ./src

# Instalar dependências
RUN npm install --production

# Expor a porta
EXPOSE 8080

# Comando de inicialização
CMD ["npm", "start"]
```

### Build e Execução

- **Build da imagem:**
  ```bash
  docker build -t microsservico-data .
  ```
- **Execução do contêiner:**
  ```bash
  docker run -p 8080:8080 microsservico-data
  ```

---

## Orquestração com Kubernetes

### Arquivos de Manifesto

Os principais componentes para a implantação no Kubernetes incluem `Deployment`, `Service` e `Horizontal Pod Autoscaler (HPA)`.

#### Deployment

Configura a implantação do microsserviço, garantindo a resiliência com múltiplas réplicas:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: microsservico-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: microsservico
  template:
    metadata:
      labels:
        app: microsservico
    spec:
      containers:
        - name: microsservico
          image: microsservico-data:latest
          ports:
            - containerPort: 8080
          resources:
            requests:
              memory: '256Mi'
              cpu: '250m'
            limits:
              memory: '512Mi'
              cpu: '500m'
```

#### Service

Configura um serviço para expor o microsserviço:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: microsservico-service
spec:
  selector:
    app: microsservico
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer
```

#### Horizontal Pod Autoscaler (HPA)

Configura o escalonamento automático com base no uso de CPU:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: microsservico-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: microsservico-deployment
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

---

## Estratégia de Monitoramento

### Logs

- **Ferramenta:** Elasticsearch, Fluentd e Kibana (EFK stack).
- **Configuração:** Redirecionar logs dos contêineres para Fluentd e indexar no Elasticsearch.

### Métricas

- **Ferramenta:** Prometheus e Grafana.
- **Configuração:** Expor métricas customizadas do microsserviço em `/metrics` e monitorar com Prometheus.

---

## Instruções para Implantação

1. **Configurar o cluster Kubernetes:**

   ```bash
   kubectl create namespace microsservico
   ```

2. **Aplicar os manifestos:**

   ```bash
   kubectl apply -f kubernetes/deployment.yaml
   kubectl apply -f kubernetes/service.yaml
   kubectl apply -f kubernetes/hpa.yaml
   ```

3. **Verificar o status dos pods:**

   ```bash
   kubectl get pods -n microsservico
   ```

4. **Obter o endpoint do serviço:**
   ```bash
   kubectl get service -n microsservico
   ```

---

## Estratégia de Escalabilidade

- **Escalabilidade Horizontal:** Gerenciada pelo HPA para ajustar o número de pods.
- **Escalabilidade Vertical:** Configurar `requests` e `limits` apropriados para os contêineres no Deployment.
- **Caching:** Adicionar Redis como camada intermediária para melhorar o desempenho das leituras.

---

## Considerações Finais

Essa estratégia de implantação utiliza práticas modernas para garantir resiliência, escalabilidade e fácil manutenção do microsserviço em ambientes de produção. A integração com ferramentas de monitoramento e escalabilidade automática garante que o serviço possa lidar com altos volumes de tráfego.
