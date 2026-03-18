# DevOps & Platform Engineering – ERP Modular Cloud-Native

## 📌 Sobre o Projeto

Este repositório faz parte de um projeto acadêmico que simula o desenvolvimento de um **ERP Modular Cloud-Native**, onde a turma é organizada como uma empresa de tecnologia dividida em diferentes **Squads** responsáveis por partes específicas do sistema.

O **Squad 5 – DevOps & Platform Engineering** é responsável por toda a **infraestrutura da plataforma**, garantindo que os serviços desenvolvidos pelos outros squads possam ser executados, integrados e monitorados dentro de um ambiente moderno baseado em práticas de **DevOps** e **Cloud-Native Architecture**.

Nosso objetivo é fornecer uma plataforma robusta para execução dos módulos do ERP, utilizando tecnologias modernas de **containerização, automação e integração contínua**.

---

## 🏗 Responsabilidades do Squad

O Squad de DevOps & Platform Engineering possui as seguintes responsabilidades dentro do projeto:

* Provisionamento da infraestrutura da aplicação
* Containerização dos serviços utilizando Docker
* Automação de processos de build e deploy
* Implementação de pipelines de CI/CD
* Monitoramento da plataforma
* Criação do portal de integração (**Marketplace de módulos**)

Este squad atua como a **base operacional da plataforma**, permitindo que os demais squads desenvolvam seus módulos de forma desacoplada.

---

## 🧩 Arquitetura da Plataforma

A arquitetura proposta segue princípios de **Cloud-Native e Microservices**, permitindo que diferentes módulos do ERP sejam desenvolvidos e integrados de forma independente.

Fluxo simplificado da arquitetura:

Users
↓
API Gateway
↓
Marketplace / Platform Layer
↓
Microservices (Squads)
↓
Containers (Docker)
↓
Infrastructure & CI/CD Pipeline

---

## ⚙️ Tecnologias Utilizadas

As seguintes tecnologias estão sendo utilizadas ou avaliadas para o desenvolvimento da infraestrutura da plataforma:

* Docker (Containerização)
* Kubernetes ou Docker Compose (Orquestração de Containers)
* GitHub (Controle de versão)
* CI/CD Pipelines
* OpenProject (Gestão de Projeto)
* Linux Environment

---

## 🔄 CI/CD Pipeline

O projeto segue o conceito de **Continuous Integration e Continuous Deployment**, permitindo automatizar o ciclo de desenvolvimento.

Fluxo do pipeline:

1. Desenvolvedor realiza commit no repositório
2. Pipeline de CI é acionado
3. Build e validação do projeto
4. Criação ou atualização dos containers
5. Deploy automatizado no ambiente da plataforma

---

## 📊 Monitoramento da Plataforma

A plataforma também contempla práticas de **observabilidade**, permitindo monitorar:

* status dos serviços
* logs da aplicação
* disponibilidade dos containers
* desempenho da infraestrutura

Isso garante maior confiabilidade e manutenção da plataforma.

---

## 🏪 Marketplace da Plataforma

O Marketplace é responsável por permitir a integração entre os módulos desenvolvidos pelos diferentes squads.

Exemplos de módulos do ERP:

* Core Engine & Authentication
* Financeiro & Fiscal
* CRM & Growth
* Service Desk
* Plataforma DevOps

O objetivo do Marketplace é atuar como um **ponto central de integração entre os serviços da plataforma**.

---

## 👥 Equipe – Squad 5

Squad responsável por **DevOps & Platform Engineering**.

Responsabilidades principais:

* Infraestrutura
* Automação
* Integração entre módulos
* Plataforma de execução do ERP

---

## 📄 Licença

Este projeto possui caráter **educacional e acadêmico**.

