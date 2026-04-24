# PRD — DevOps & Platform Engineering

--- 

## 1. Visão Geral

O Squad 5 – DevOps & Platform Engineering é responsável por estruturar a operação técnica da plataforma, garantindo que os serviços desenvolvidos pelos demais squads possam ser executados, automatizados e mantidos com previsibilidade.

---

## 2. Problema Operacional

No cenário atual, a ausência de uma base operacional comum pode gerar:

- dificuldade para subir os serviços de forma consistente;
- dependência de configuração manual;
- falhas recorrentes em build e deploy;
- baixa rastreabilidade de mudanças;
- dificuldade de integração entre componentes;
- perda de tempo na resolução de problemas de ambiente.

Esses fatores afetam diretamente a confiabilidade da plataforma e a produtividade das equipes.

---

## 3. Objetivo Operacional

A plataforma deve permitir que os squads trabalhem sobre uma base comum, com foco em:

- execução previsível dos serviços;
- automação de build e deploy;
- redução de intervenção manual;
- centralização das informações dos módulos;
- suporte a integração contínua no ambiente acadêmico.

---
## 4. Escopo Operacional

### Dentro do escopo
- configuração do ambiente base;
- containerização dos serviços;
- automação do pipeline de integração;
- automação do processo de entrega;
- atualização de containers no ambiente da plataforma;
- catálogo central de módulos.

### Fora do escopo
- operação de ambiente produtivo comercial;

---

## 5. Entregas Principais

### 5.1 Ambiente Padronizado
A plataforma deve fornecer um ambiente técnico comum para execução dos serviços.

### 5.2 Containers dos Serviços
Os serviços devem estar empacotados de forma padronizada, com comportamento previsível.

### 5.3 Pipeline de CI/CD
A entrega deve passar por um fluxo automatizado de validação e atualização.

### 5.4 Marketplace / Catálogo de Módulos
Deve existir um ponto central de consulta dos módulos da plataforma.

---

## 6. Requisitos Funcionais

- A plataforma deve permitir iniciar os serviços com baixo atrito.
- Cada módulo deve possuir definição de container. 
- O pipeline deve ser acionado automaticamente após alterações no repositório.
- O fluxo deve contemplar build e validações mínimas.
- O ambiente deve suportar atualização dos containers.
- O marketplace deve listar os módulos disponíveis.
- Os módulos devem possuir identificação mínima para integração.

---

## 7. Requisitos Não Funcionais

- **Confiabilidade:** o processo deve reduzir falhas causadas por execução manual.
- **Rastreabilidade:** deve ser possível acompanhar o status do pipeline.
- **Reprodutibilidade:** o ambiente deve ser reproduzível em máquinas compatíveis.
- **Manutenibilidade:** a solução deve ser simples de entender e manter.
- **Consistência:** os serviços devem se comportar de forma semelhante nos ambientes previstos.
- **Eficiência operacional:** o fluxo deve reduzir retrabalho entre squads.

---

## 8. Tecnologias Utilizadas

- Docker Compose
- GitHub
- CI/CD Pipelines (Jenkins)
- OpenProject
- Plane

---

## 9. Fluxo Operacional de CI/CD

1. Desenvolvedor realiza commit no repositório
2. Pipeline é acionada automaticamente
3. O sistema executa build e validações mínimas
4. Os containers são gerados ou atualizados
5. O deploy é realizado no ambiente definido
6. O status do processo deve ser acompanhado pela equipe

---

## 10. Marketplace da Plataforma

### Visão Geral
O Marketplace é a estrutura centralizada da Plataforma DevOps responsável por reunir, organizar e disponibilizar os módulos e serviços desenvolvidos pelos diferentes squads. Ele funciona como o catálogo oficial de soluções, permitindo que usuários e equipes descubram e solicitem recursos técnicos de forma padronizada.

### Problema Resolvido
Sem o Marketplace, os módulos ficariam dispersos em diferentes repositórios ou ambientes, dificultando a localização, o consumo e a governança dos serviços. O Marketplace resolve a fragmentação técnica ao oferecer uma interface única para consulta, garantindo que todo o esforço de desenvolvimento dos squads seja visível e acessível em um único ponto de entrada.

### Objetivo
O objetivo central é consolidar a oferta de serviços da plataforma em uma interface acessível, permitindo a listagem dinâmica de módulos, a visualização de metadados técnicos (como squad responsável e status) e a formalização de solicitações de uso através de um fluxo de checkout acadêmico.

### Funcionamento Geral
O fluxo operacional do Marketplace está implementado da seguinte forma:
1. **Descoberta**: O usuário acessa o catálogo principal e visualiza os cartões de cada módulo disponível, consumidos dinamicamente da API.
2. **Detalhamento**: Ao selecionar um item, o sistema exibe informações específicas do módulo, incluindo descrição completa e etiquetas de identificação.
3. **Seleção**: O usuário adiciona os módulos de interesse a um carrinho de solicitações temporário.
4. **Checkout**: Através de um formulário de identificação (nome e e-mail corporativo), o usuário finaliza a solicitação.
5. **Processamento e Registro**: O backend valida os dados, calcula o escopo da solicitação e registra o pedido no banco de dados para fins de histórico e auditoria.

### Estrutura Técnica de Integração
A solução integra as três camadas fundamentais da plataforma:
- **Frontend (React)**: Gerencia o estado do catálogo, a navegação entre detalhes e o carrinho de pedidos, interagindo com o backend via requisições assíncronas.
- **Backend (Node.js/Express)**: Camada de serviços que orquestra o acesso aos dados dos módulos e implementa a lógica de criação de pedidos.
- **Banco de Dados (SQLite)**: Persiste as tabelas de módulos e pedidos, servindo como a "fonte da verdade" para o estado da plataforma.

### Endpoints de Sustentação
A estrutura é suportada pelos seguintes endpoints RESTful:
- `GET /api/modules`: Listagem de todos os módulos cadastrados.
- `GET /api/modules/:id`: Recuperação de informações detalhadas de um módulo específico.
- `POST /api/orders`: Registro formal de uma nova solicitação/pedido.
- `GET /api/orders`: Consulta ao histórico de pedidos realizados.

### Papel na Arquitetura e Benefícios
Dentro da arquitetura DevOps, o Marketplace atua como a camada de entrega (Delivery Layer). Seus principais benefícios incluem:
- **Padronização:** Todos os módulos seguem o mesmo modelo de exibição e fluxo de solicitação.
- **Rastreabilidade:** Cada "pedido" gera um registro no banco de dados, permitindo saber quem solicitou qual módulo e quando.
- **Integração:** Facilita a comunicação entre squads, eliminando a necessidade de processos manuais para descoberta de APIs e serviços.

---

## 11. MVP Operacional

O MVP deve incluir:

- execução padronizada com Docker;
- ambiente integrado com Docker Compose;
- pipeline inicial de CI;
- atualização automatizada ou semi-automatizada de containers;
- catálogo inicial de módulos.

---

## 12. Critérios de Aceitação

- Os serviços devem subir no ambiente padronizado.
- O pipeline deve executar ao menos um fluxo automatizado de integração.
- Os containers devem poder ser gerados e atualizados.
- Deve existir um catálogo central dos módulos.
- A equipe deve conseguir reproduzir o ambiente com base na documentação.

---

## 13. Riscos

- falhas por ausência de padrão entre squads;
- dificuldade de manutenção da automação;
- documentação insuficiente;
- excesso de dependência manual no processo;
- incompatibilidade entre módulos integrados.

---

## 14. Dependências

- alinhamento técnico entre squads;
- adesão às convenções definidas;
- ambiente Linux compatível;
- organização mínima dos repositórios e serviços.

---

## 16. Contexto do Projeto

Este projeto possui caráter acadêmico e educacional. A solução foi pensada para sustentar um ambiente de integração entre squads com foco em aprendizado, automação e padronização operacional.
