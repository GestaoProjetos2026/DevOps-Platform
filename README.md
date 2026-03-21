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
- SLA formal de produção;
- alta disponibilidade avançada;
- monitoramento enterprise, salvo adaptação futura.

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

- Docker
- Docker Compose
- GitHub
- CI/CD Pipelines
- OpenProject
- Plane
- Linux Environment

---

## 9. Fluxo Operacional de CI/CD

1. Desenvolvedor realiza commit no repositório
2. Pipeline é acionada automaticamente
3. O sistema executa build e validações mínimas
4. Os containers são gerados ou atualizados
5. O deploy é realizado no ambiente definido
6. O status do processo deve ser acompanhado pela equipe

---

## 10. Marketplace de Módulos

O marketplace deve atuar como um ponto central de consulta e integração entre módulos.

### Objetivos do marketplace
- concentrar a visibilidade dos módulos do ERP;
- facilitar o entendimento sobre o papel de cada componente;
- apoiar a integração entre squads;
- servir como referência do ecossistema da plataforma.

### Exemplos de módulos
- Core Engine & Authentication
- Financeiro & Fiscal
- CRM & Growth
- Service Desk
- Plataforma DevOps

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

## 13. Métricas Operacionais

- tempo para subir o ambiente;
- tempo médio de execução do pipeline;
- taxa de sucesso do pipeline;
- número de falhas manuais reduzidas;
- quantidade de módulos integrados ao ambiente.

---

## 14. Riscos

- falhas por ausência de padrão entre squads;
- dificuldade de manutenção da automação;
- documentação insuficiente;
- excesso de dependência manual no processo;
- incompatibilidade entre módulos integrados.

---

## 15. Dependências

- alinhamento técnico entre squads;
- adesão às convenções definidas;
- ambiente Linux compatível;
- organização mínima dos repositórios e serviços.

---

## 16. Contexto do Projeto

Este projeto possui caráter acadêmico e educacional. A solução foi pensada para sustentar um ambiente de integração entre squads com foco em aprendizado, automação e padronização operacional.
