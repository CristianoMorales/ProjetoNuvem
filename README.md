# 🎮 Projeto Games API 

> CRUD de jogos + API Gateway + Lambda `/report` + Banco RDS

## 👥 Grupo
- 10437953 - Cristiano Fraissat Morales
- 10417980 - Mateo Zanette


## 🚀 Visão Geral

Este projeto consiste em uma API REST para gerenciamento de jogos, com funcionalidades completas de CRUD (`Create`, `Read`, `Update`, `Delete`) utilizando Node.js com Express. A aplicação foi containerizada com Docker e integrada com serviços AWS:

- **Banco de dados**: PostgreSQL no Amazon RDS (sub-rede privada)
- **API REST**: hospedada em container EC2/Docker
- **API Gateway**: permite acesso seguro às rotas da aplicação
- **Lambda `/report`**: função que consome a API e retorna estatísticas sobre os jogos
- **CI/CD**: via GitHub + CodePipeline (não implantado por restrição da AWS Academy)

### Endpoints disponíveis

| Método | Rota         | Descrição                  |
|--------|--------------|----------------------------|
| GET    | `/games`     | Lista todos os jogos       |
| GET    | `/games/:id` | Retorna um jogo por ID     |
| POST   | `/games`     | Cria um novo jogo          |
| PUT    | `/games/:id` | Atualiza dados de um jogo  |
| DELETE | `/games/:id` | Remove um jogo do sistema  |

## 🧩 Arquitetura

| Camada   | Serviço               | Descrição                              |
|----------|-----------------------|----------------------------------------|
| Backend  | EC2 + Docker          | API REST Node.js com Express           |
| Banco    | Amazon RDS            | PostgreSQL em subnet privada           |
| Gateway  | Amazon API Gateway    | Acesso às rotas REST                   |
| Função   | AWS Lambda            | Gera relatório JSON (`/report`)        |





