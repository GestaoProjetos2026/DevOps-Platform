# 🚀 Documentação Completa: Deploy do Ambiente em Máquina Virtual (VM)

Este guia apresenta o passo a passo detalhado e intuitivo para preparar uma Máquina Virtual (VM) e subir todo o ambiente, incluindo Docker, K3s, ArgoCD, stack de observabilidade, rotas seguras (HTTPS com Cert-Manager) e banco de dados centralizado.

---

## 📌 1. Preparação da VM

Para começar, você precisará de uma Máquina Virtual rodando Linux (recomenda-se **Ubuntu 22.04** ou superior). 

1. Acesse sua VM via SSH:
   ```bash
   ssh usuario@ip-da-sua-vm
   ```
2. Atualize os pacotes do sistema operacional:
   ```bash
   sudo apt-get update && sudo apt-get upgrade -y
   ```

---

## 🐳 2. Instalação do Docker

O Docker é necessário para rodar containers de forma isolada, embora o Kubernetes gerencie grande parte do ambiente.

1. Instale os pacotes básicos:
   ```bash
   sudo apt-get install -y ca-certificates curl gnupg lsb-release
   ```
2. Adicione a chave GPG oficial do Docker:
   ```bash
   sudo mkdir -p /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   ```
3. Configure o repositório do Docker:
   ```bash
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```
4. Instale o Docker e o Docker Compose:
   ```bash
   sudo apt-get update
   sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```
5. Valide a instalação:
   ```bash
   sudo docker run hello-world
   docker compose version
   ```

---

## ☸️ 3. Instalação do K3s (Kubernetes Leve)

O K3s é uma distribuição Kubernetes altamente otimizada, excelente para esse tipo de ambiente.

1. Instale o K3s com o script oficial:
   ```bash
   curl -sfL https://get.k3s.io | sh -
   ```
2. Ajuste as permissões do arquivo de configuração para não precisar usar `sudo` com o `kubectl`:
   ```bash
   sudo chmod 644 /etc/rancher/k3s/k3s.yaml
   export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
   echo 'export KUBECONFIG=/etc/rancher/k3s/k3s.yaml' >> ~/.bashrc
   ```
3. Verifique se o cluster está rodando:
   ```bash
   kubectl get nodes
   ```
   *Você deve ver um nó com status `Ready` e ROLE `control-plane`.*

---

## 🐙 4. Instalação do ArgoCD

O ArgoCD será a ferramenta principal de CD (Continuous Delivery) utilizando a abordagem GitOps.

1. Crie o namespace do ArgoCD:
   ```bash
   kubectl create namespace argocd
   ```
2. Aplique os manifestos oficiais de instalação:
   ```bash
   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
   ```
3. Exponha a interface do ArgoCD para acesso externo alterando o serviço para NodePort:
   ```bash
   kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "NodePort"}}'
   ```
   Em seguida, descubra qual porta foi atribuída (verifique a porta na faixa de 30000+ mapeada para a porta 80 ou 443):
   ```bash
   kubectl get svc argocd-server -n argocd
   ```
   *Exemplo de acesso no navegador: `https://<ip-da-sua-vm>:<porta-descoberta>`*

4. Recupere a senha inicial do admin:
   ```bash
   kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
   ```
   *O usuário padrão é `admin`.*

> **💡 Sobre os apps no `infra-centralizado`:** 
> Cada aplicativo deste repositório terá o seu próprio `namespace` isolado dentro do cluster. 

Para criar os namespaces de todas as aplicações, execute:
```bash
kubectl create namespace core-engine
kubectl create namespace crm-leads
kubectl create namespace devops-platform
kubectl create namespace fiscal-finance
kubectl create namespace service-desk
```

Após criar os namespaces, o ArgoCD deve ser configurado para "olhar" (watch) a pasta de cada aplicativo no repositório Git de infraestrutura e aplicar automaticamente as mudanças. Você pode fazer isso diretamente pela **Interface Web do ArgoCD (UI)** ou via **Manifesto YAML**.

### Opção A: Configuração via Interface Web (UI) - Recomendado

1. **Conectar o Repositório Git:**
   - Acesse a interface web do ArgoCD e vá em **Settings** > **Repositories**.
   - Clique em **+ CONNECT REPO**.
   - Preencha com o link do seu repositório (ex: `https://github.com/GestaoProjetos2026/infra-centralizado-main.git`).
   - Verifique se o `CONNECTION STATUS` fica verde como **Successful**.

2. **Permitir os Namespaces no Cluster Local:**
   - Vá em **Settings** > **Clusters**.
   - Edite o cluster padrão chamado `in-cluster` (URL: `https://kubernetes.default.svc`).
   - No campo **NAMESPACES**, preencha com a lista de todos os namespaces que receberão deploy: 
     `devops-platform, core-engine, service-desk, crm-leads, fiscal-finance, observability`
   - Salve a configuração.

3. **Criar as Aplicações:**
   - Volte para a tela inicial de **Applications** e clique em **+ NEW APP**.
   - Crie uma aplicação para cada módulo (ex: `devops-platform`), configurando da seguinte forma:
     - **General > Sync Policy**: Selecione `Automatic` e marque as caixas `Prune` e `Self Heal`.
     - **Source > Repository URL**: Selecione o repositório que você conectou no passo 1.
     - **Source > Path**: Escreva o nome da pasta (ex: `devops-platform`).
     - **Destination > Cluster URL**: Escolha a URL `https://kubernetes.default.svc`.
     - **Destination > Namespace**: Digite o respectivo namespace (ex: `devops-platform`).
   - Confirme a criação e o ArgoCD começará a sincronizar (Sync) os manifests daquela pasta com o cluster de forma automática.
   - Repita o processo de criação de **NEW APP** para as pastas `core-engine`, `crm-leads`, `fiscal-finance` e `service-desk`.

### Opção B: Configuração Automática via Manifesto YAML

Caso prefira configurar via terminal, aqui está o exemplo para o app `core-engine` (basta repetir alterando os nomes/caminhos para os demais aplicativos):

```bash
cat <<EOF | kubectl apply -f -
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: core-engine
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/GestaoProjetos2026/infra-centralizado-main.git'
    targetRevision: main
    path: core-engine
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: core-engine
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
EOF
```

---

## 📊 5. Stack de Observabilidade (Grafana, Promtail e Loki)

Para facilitar a gestão de logs, instalamos a stack centralizada através do ArgoCD.

1. Crie o namespace da observabilidade:
   ```bash
   kubectl create namespace observability
   ```
2. Se você já tem o arquivo `observability-stack.yaml` (do `infra-centralizado-main`), basta aplicá-lo:
   ```bash
   kubectl apply -f infra-centralizado-main/observability-stack.yaml
   ```
   *Isso criará uma 'Application' no ArgoCD que vai automaticamente baixar e instalar o Grafana e o Loki-stack no namespace `observability` usando um Ingress apontado para o seu host configurado.*

3. Obtenha a senha do Grafana:
   ```bash
   kubectl get secret --namespace observability observability-stack-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
   ```

---

## 🔐 6. Instalação das Rotas HTTPS (Cert-Manager)

Para expor os serviços publicamente com criptografia, vamos configurar o `cert-manager`.

1. Instale o cert-manager (os CRDs e os webhooks):
   ```bash
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.16.0/cert-manager.yaml
   ```
2. Verifique se os pods estão rodando:
   ```bash
   kubectl get pods --namespace cert-manager
   ```
3. Crie o arquivo `cluster-issuer.yaml` para configurar a autoridade certificadora (Let's Encrypt):
   ```yaml
   apiVersion: cert-manager.io/v1
   kind: ClusterIssuer
   metadata:
     name: letsencrypt-prod
   spec:
     acme:
       server: https://acme-v02.api.letsencrypt.org/directory
       email: SEU_EMAIL@exemplo.com 
       privateKeySecretRef:
         name: letsencrypt-prod
       solvers:
         - http01:
             ingress:
               class: traefik
   ```
4. Aplique a configuração:
   ```bash
   kubectl apply -f cluster-issuer.yaml
   ```
> A partir de agora, qualquer `Ingress` nos seus apps (ex: crm-leads, core-engine) que contiver a annotation `cert-manager.io/cluster-issuer: "letsencrypt-prod"` vai automaticamente gerar e renovar certificados SSL!

---

## 🗄️ 7. Banco de Dados Centralizado (PostgreSQL)

O banco de dados será mantido no namespace `infra-banco`, criando schemas dinâmicos para cada sistema da plataforma.

1. Crie um arquivo chamado `banco-de-dados.yaml` contendo toda a infraestrutura base de dados.
2. Copie o seguinte conteúdo para o arquivo:

<details>
<summary>Clique para ver o conteúdo do banco-de-dados.yaml</summary>

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: infra-banco
---
apiVersion: v1
kind: Secret
metadata:
  name: postgres-secret
  namespace: infra-banco
type: Opaque
stringData:
  POSTGRES_DB: "prod_hub"
  POSTGRES_USER: "postgres_admin"
  POSTGRES_PASSWORD: "SenhaAdminSuperSegura123!"
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: postgres-init-script
  namespace: infra-banco
data:
  init-schemas.sql: |
    CREATE SCHEMA IF NOT EXISTS core_shared;
    CREATE SCHEMA IF NOT EXISTS core_engine;
    CREATE SCHEMA IF NOT EXISTS crm_leads;
    CREATE SCHEMA IF NOT EXISTS service_desk;
    CREATE SCHEMA IF NOT EXISTS finance_fiscal;
    CREATE SCHEMA IF NOT EXISTS devops_platform;

    CREATE USER user_core_engine WITH PASSWORD 'SenhaCore123!';
    CREATE USER user_crm_leads WITH PASSWORD 'SenhaCrm123!';
    CREATE USER user_service_desk WITH PASSWORD 'SenhaService123!';
    CREATE USER user_finance_fiscal WITH PASSWORD 'SenhaFinance123!';
    CREATE USER user_devops_platform WITH PASSWORD 'SenhaDevops123!';

    GRANT USAGE, CREATE ON SCHEMA core_engine TO user_core_engine;
    ALTER DEFAULT PRIVILEGES IN SCHEMA core_engine GRANT ALL ON TABLES TO user_core_engine;
    GRANT USAGE ON SCHEMA core_shared TO user_core_engine;
    ALTER DEFAULT PRIVILEGES IN SCHEMA core_shared GRANT ALL ON TABLES TO user_core_engine;
    ALTER USER user_core_engine SET search_path TO core_engine, core_shared;

    GRANT USAGE, CREATE ON SCHEMA crm_leads TO user_crm_leads;
    ALTER DEFAULT PRIVILEGES IN SCHEMA crm_leads GRANT ALL ON TABLES TO user_crm_leads;
    GRANT USAGE ON SCHEMA core_shared TO user_crm_leads;
    ALTER DEFAULT PRIVILEGES IN SCHEMA core_shared GRANT ALL ON TABLES TO user_crm_leads;
    ALTER USER user_crm_leads SET search_path TO crm_leads, core_shared;

    GRANT USAGE, CREATE ON SCHEMA service_desk TO user_service_desk;
    ALTER DEFAULT PRIVILEGES IN SCHEMA service_desk GRANT ALL ON TABLES TO user_service_desk;
    GRANT USAGE ON SCHEMA core_shared TO user_service_desk;
    ALTER DEFAULT PRIVILEGES IN SCHEMA core_shared GRANT ALL ON TABLES TO user_service_desk;
    ALTER USER user_service_desk SET search_path TO service_desk, core_shared;

    GRANT USAGE, CREATE ON SCHEMA finance_fiscal TO user_finance_fiscal;
    ALTER DEFAULT PRIVILEGES IN SCHEMA finance_fiscal GRANT ALL ON TABLES TO user_finance_fiscal;
    GRANT USAGE ON SCHEMA core_shared TO user_finance_fiscal;
    ALTER DEFAULT PRIVILEGES IN SCHEMA core_shared GRANT ALL ON TABLES TO user_finance_fiscal;
    ALTER USER user_finance_fiscal SET search_path TO finance_fiscal, core_shared;

    GRANT USAGE, CREATE ON SCHEMA devops_platform TO user_devops_platform;
    ALTER DEFAULT PRIVILEGES IN SCHEMA devops_platform GRANT ALL ON TABLES TO user_devops_platform;
    GRANT USAGE ON SCHEMA core_shared TO user_devops_platform;
    ALTER DEFAULT PRIVILEGES IN SCHEMA core_shared GRANT ALL ON TABLES TO user_devops_platform;
    ALTER USER user_devops_platform SET search_path TO devops_platform, core_shared;
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
  namespace: infra-banco
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: local-path
  resources:
    requests:
      storage: 20Gi
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: infra-banco
spec:
  serviceName: "postgres-svc"
  replicas: 1
  selector:
    matchLabels:
      app: postgres-server
  template:
    metadata:
      labels:
        app: postgres-server
    spec:
      containers:
      - name: postgres
        image: postgres:15-alpine
        ports:
        - containerPort: 5432
          name: dbport
        envFrom:
        - secretRef:
            name: postgres-secret
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
          subPath: pgdata
        - name: init-script
          mountPath: /docker-entrypoint-initdb.d
      volumes:
      - name: postgres-storage
        persistentVolumeClaim:
          claimName: postgres-pvc
      - name: init-script
        configMap:
          name: postgres-init-script
---
apiVersion: v1
kind: Service
metadata:
  name: postgres-svc
  namespace: infra-banco
spec:
  type: ClusterIP
  ports:
  - port: 5432
    targetPort: 5432
  selector:
    app: postgres-server
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis-broker
  namespace: infra-banco
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis-broker
  template:
    metadata:
      labels:
        app: redis-broker
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
          name: redisport
---
apiVersion: v1
kind: Service
metadata:
  name: redis-svc
  namespace: infra-banco
spec:
  type: ClusterIP
  ports:
  - port: 6379
    targetPort: 6379
  selector:
    app: redis-broker
```
</details>

3. Aplique a estrutura no Kubernetes:
   ```bash
   kubectl apply -f banco-de-dados.yaml
   ```
4. Confirme que o banco e o Redis subiram corretamente:
   ```bash
   kubectl get pods -n infra-banco
   ```

---

## 🔄 8. Integração Contínua (CI/CD) com GitHub Actions e ArgoCD

A automação de entregas está mapeada no repositório através das rotinas do GitHub Actions (em especial o arquivo `pipeline2.yaml`). Essa pipeline realiza a ponte entre o código-fonte desenvolvido e o ambiente em execução no K3s. 

A esteira executa o seguinte fluxo:
1. **Build & Push (Docker):** A pipeline constrói as imagens Docker dos diretórios `backend` e `frontend` com a tag da versão atual e as envia para o Docker Hub.
2. **Atualização da Infraestrutura (`deploy.yaml` e repositórios de infra):** Em seguida, a pipeline clona automaticamente o repositório centralizado de infraestrutura (`infra-centralizado-main`). Usando comandos automatizados, ela edita os arquivos `deployment.yaml` das respectivas pastas (substituindo pela nova imagem/tag gerada) e realiza um `git commit` e `git push` no repositório.
3. **Sincronização Ativa com ArgoCD:** Por fim, a pipeline se conecta ao ArgoCD da sua VM (via CLI), faz login e dispara um comando de `refresh` na aplicação. Isso obriga o ArgoCD a perceber a mudança no repositório e atualizar os pods no cluster de forma instantânea.

### 🔑 Segredos e Variáveis Necessárias no GitHub
Para que o arquivo `pipeline2.yaml` funcione sem problemas de permissão, é estritamente necessário configurar os seguintes **Secrets** nas configurações do repositório no GitHub (`Settings > Secrets and variables > Actions`):
- `DOCKERHUB_USERNAME` e `DOCKERHUB_PASSWORD`: Suas credenciais para subir a imagem.
- `GH_TOKEN`: Um Personal Access Token do GitHub com permissões para commitar no repositório de infraestrutura (`infra-centralizado-main`).
- `GH_EMAIL`: E-mail associado à conta do GitHub que fará os commits automáticos.
- `ARGOCD_SERVER`: O IP e porta do seu ArgoCD exposto externamente (ex: `<ip-da-vm>:NodePort` ou domínio HTTPS).
- `ARGOCD_USERNAME` e `ARGOCD_PASSWORD`: O usuário (geralmente `admin`) e senha do ArgoCD.

---
🎉 **Parabéns!** O seu ambiente de plataforma centralizado está totalmente instanciado. Agora, com todo o fluxo de CI/CD perfeitamente conectado, o ArgoCD sincronizará de forma automatizada o repositório de infraestrutura realizando o deploy contínuo de suas aplicações com segurança e resiliência.
