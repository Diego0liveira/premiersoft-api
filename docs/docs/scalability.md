# Escalabilidade

## Introdução
A escalabilidade é um componente essencial de qualquer aplicação moderna. Este projeto foi projetado para ser altamente escalável, tanto verticalmente (adicionando mais recursos a um servidor) quanto horizontalmente (adicionando mais servidores). Abaixo estão os princípios e estratégias implementadas para alcançar escalabilidade e atender ao aumento de carga com eficiência.

---

## Estratégias de Escalabilidade

### 1. **Containerização**
A aplicação é totalmente containerizada usando Docker, o que permite isolar dependências e configurações. Isso garante que cada instância seja idêntica e facilmente replicável.

- **Ferramenta utilizada**: Docker
- **Orquestração**: Kubernetes é usado para gerenciar múltiplas réplicas de containers, permitindo escalonamento automático com base em métricas de uso.

### 2. **Orquestração com Kubernetes**

### Kubernetes Horizontal Pod Autoscaler (HPA)

O uso do Kubernetes facilita o escalonamento horizontal por meio de réplicas de pods. Configurações como `Horizontal Pod Autoscaler (HPA)` permitem ajustar automaticamente o número de réplicas com base em métricas como:

- Uso de CPU e memória
- Tamanho da fila de mensagens do Kafka
- Latência de requisições

#### Exemplos de Configuração:
- `deployment.yaml` para definir réplicas mínimas e máximas:

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: app-deployment
  spec:
    replicas: 3 # Número inicial de réplicas
    template:
      spec:
        containers:
        - name: app
          image: app-image
  ```

- Configurado para ajustar automaticamente o número de pods com base em métricas de uso, como CPU e memória.
- Configuração de exemplo no manifesto HPA para escalonamento automático:

  ```yaml
  apiVersion: autoscaling/v2
  kind: HorizontalPodAutoscaler
  metadata:
    name: app-hpa
  spec:
    scaleTargetRef:
      apiVersion: apps/v1
      kind: Deployment
      name: app-deployment
    minReplicas: 2
    maxReplicas: 10
    metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
  ```

**Vantagens:**

- Responde rapidamente a picos de tráfego.
- Reduz custos durante períodos de baixa demanda.

---

## Escalabilidade Vertical

A escalabilidade vertical envolve alocar mais recursos (CPU/memória) para os contêineres do microsserviço.

### Configuração de Recursos

- Definir solicitações e limites de recursos no manifesto do Deployment:

```yaml
resources:
  requests:
    memory: '256Mi'
    cpu: '250m'
  limits:
    memory: '512Mi'
    cpu: '500m'
```

**Vantagens:**

- Melhora o desempenho em ambientes com alta densidade de carga.
- Reduz o risco de interrupções por falta de recursos.

**Desvantagem:**

- Limitação física de recursos no nó.

---

### 3. **Cache Distribuído**
A integração com Redis melhora o desempenho ao reduzir a carga no banco de dados e armazenar respostas para consultas frequentes. Isso permite que múltiplas instâncias compartilhem o mesmo cache.

#### Benefícios:
- Redução de latência
- Melhor utilização de recursos
- Menor carga no PostgreSQL

### 4. **Banco de Dados Escalável**
O projeto utiliza o PostgreSQL, que oferece suporte a:
- **Replicação**: Para distribuir leituras entre réplicas.
- **Particionamento de tabelas**: Para dividir dados em partições menores e gerenciáveis.

### 5. **Mensageria com Kafka**
O Kafka permite o processamento assíncrono e escalável de mensagens, reduzindo a dependência de operações síncronas. O sistema pode escalar consumidores para lidar com o aumento do tráfego.

---

## Monitoramento e Alertas
Para garantir que a escalabilidade seja gerenciada de forma eficaz, a aplicação utiliza ferramentas de monitoramento e alertas:

### Ferramentas:
- **Kibana**: Para análise e visualização de logs.
- **Prometheus e Grafana**: Para monitorar métricas de uso de recursos e desempenho.

### Métricas Monitoradas:
- Utilização de CPU e memória dos containers
- Tempo de resposta das APIs
- Tamanho da fila de mensagens do Kafka

---

## Testes de Carga e Performance

Realizar testes de carga regularmente para validar a escalabilidade e identificar possíveis gargalos.

- **Ferramentas Sugeridas:**
  - Apache JMeter.
  - k6.
- **Metas:**
  - Garantir tempo de resposta < 500ms para 95% das requisições.
  - Verificar a capacidade de lidar com picos de tráfego sem degradação significativa (> 10%).

---

## Conclusão
As estratégias mencionadas garantem que a aplicação possa escalar para atender à demanda crescente sem comprometer o desempenho ou a confiabilidade. A combinação de containerização, caching, mensageria e monitoramento cria uma base robusta para o crescimento sustentável.
