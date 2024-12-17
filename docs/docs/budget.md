# Orçamento do Projeto na AWS

## Visão Geral

Esta é uma estimativa de custos mensais para implantação e hospedagem do microsserviço na **AWS (Amazon Web Services)**, com base nos serviços necessários descritos no projeto.

---

## Serviços AWS Considerados

1. **EC2 (Elastic Compute Cloud)** - Hospedagem da aplicação com instâncias escaláveis.
2. **RDS (Relational Database Service)** - Gerenciamento do banco de dados PostgreSQL.
3. **Elastic Load Balancer (ELB)** - Balanceamento de carga para distribuir tráfego.
4. **EKS (Elastic Kubernetes Service)** - Orquestração de contêineres Kubernetes.
5. **ElastiCache Redis** - Cache para otimizar as consultas ao banco de dados.
6. **S3 (Simple Storage Service)** - Armazenamento de logs e arquivos.
7. **CloudWatch** - Monitoramento e métricas.
8. **ECR (Elastic Container Registry)** - Registro para imagens Docker.

---

## Estimativa de Custo Mensal

| **Serviço**                   | **Uso Estimado**                      | **Custo Mensal** |
| ----------------------------- | ------------------------------------- | ---------------- |
| **EC2 (t3.medium)**           | 2 instâncias, 2 CPUs, 4 GB RAM        | **$70.00**       |
| **RDS PostgreSQL**            | db.t3.medium, 100 GB de armazenamento | **$90.00**       |
| **Elastic Load Balancer**     | Tráfego de 100 GB                     | **$20.00**       |
| **EKS**                       | Cluster Kubernetes gerenciado         | **$72.00**       |
| **ElastiCache Redis**         | Cache.t3.small, 1 nó                  | **$30.00**       |
| **CloudWatch Logs & Metrics** | 10 GB logs + 5 métricas               | **$10.00**       |
| **ECR**                       | 10 GB de armazenamento de imagens     | **$5.00**        |
| **S3**                        | 50 GB de logs e backup                | **$1.50**        |
|                               |                                       |                  |
| **Total Estimado**            |                                       | **~$298.50/mês** |

---

## Detalhamento dos Custos

1. **EC2**: Duas instâncias `t3.medium` são adequadas para o microsserviço inicial, garantindo redundância.
2. **RDS PostgreSQL**: Uso de uma instância `db.t3.medium` com 100 GB de armazenamento.
3. **Elastic Load Balancer**: Balanceamento básico com 100 GB de tráfego mensal.
4. **EKS**: Kubernetes gerenciado com uma taxa fixa de **$72/mês** para o cluster, sem incluir nós.
5. **ElastiCache Redis**: Cache `t3.small` com um nó único para otimização de consultas.
6. **CloudWatch**: Monitoramento básico com logs e métricas.
7. **ECR**: Armazenamento para imagens Docker.
8. **S3**: Armazenamento econômico para logs e backups.

---

## Considerações

- O custo total **não inclui custos de dados transferidos** fora da AWS ou tráfego acima do estimado.
- A escalabilidade horizontal pode aumentar o custo das instâncias EC2 e ElastiCache conforme a demanda.
- O monitoramento pode ser ajustado para economizar custos.

---

## Total Mensal Estimado

O custo total estimado é de aproximadamente **$298.50/mês**.
