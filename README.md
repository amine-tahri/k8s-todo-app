# K8s Todo App — Fil rouge Kubernetes

Application fullstack minimaliste : **React + Node.js/Express + PostgreSQL**.
Elle sert de fil rouge pour progresser à travers les 8 phases du parcours Kubernetes.

## Structure

```
k8s-todo-app/
├── backend/            # API Node.js + Express
│   ├── src/index.js    # Routes CRUD todos
│   ├── Dockerfile      # Image multi-stage (<80 MB)
│   └── .env.example
├── frontend/           # React SPA
│   ├── src/App.js      # UI todo (ajout, toggle, filtre, suppression)
│   ├── nginx.conf      # Reverse proxy + SPA fallback
│   └── Dockerfile      # Build React → nginx alpine
├── k8s/                # Manifests Kubernetes
│   ├── 01-namespace-config.yaml
│   ├── 02-postgres.yaml
│   ├── 03-backend.yaml
│   └── 04-frontend.yaml
└── docker-compose.yml  # Phase 1 : dev local

```

## Phase 1 — Démarrage local avec Docker Compose

```bash
# Copier les variables d'environnement
cp backend/.env.example backend/.env

# Lancer toute la stack
docker compose up --build

# App disponible sur http://localhost
# API sur http://localhost:4000/api/todos
```

## Phase 2 — Déploiement Kubernetes (minikube)

```bash
# Démarrer minikube
minikube start

# Activer l'Ingress controller
minikube addons enable ingress

# Appliquer les manifests dans l'ordre
kubectl apply -f k8s/01-namespace-config.yaml
kubectl apply -f k8s/02-postgres.yaml
kubectl apply -f k8s/03-backend.yaml
kubectl apply -f k8s/04-frontend.yaml

# Vérifier l'état
kubectl get all -n todo-app

# Ajouter todo.local dans /etc/hosts
echo "$(minikube ip) todo.local" | sudo tee -a /etc/hosts

# App disponible sur http://todo.local
```

## Variables d'environnement — backend

| Variable       | Valeur par défaut | Description              |
|----------------|-------------------|--------------------------|
| PORT           | 4000              | Port du serveur HTTP     |
| DB_HOST        | localhost         | Hôte PostgreSQL          |
| DB_PORT        | 5432              | Port PostgreSQL          |
| DB_NAME        | tododb            | Nom de la base           |
| DB_USER        | postgres          | Utilisateur DB           |
| DB_PASSWORD    | postgres          | Mot de passe DB          |
| FRONTEND_URL   | *                 | CORS origin autorisée    |

## API Endpoints

| Méthode | Route            | Description           |
|---------|------------------|-----------------------|
| GET     | /health          | Healthcheck           |
| GET     | /api/todos       | Lister les todos      |
| POST    | /api/todos       | Créer un todo         |
| PATCH   | /api/todos/:id   | Mettre à jour (done)  |
| DELETE  | /api/todos/:id   | Supprimer un todo     |

## Progression par phase

| Phase | Objectif avec cette app                                    |
|-------|------------------------------------------------------------|
| 1     | Docker Compose, Dockerfile multi-stage, volumes            |
| 2     | Pods, kubectl, Namespaces, Services NodePort               |
| 3     | Deployments, Ingress, ConfigMaps, Secrets, rolling update  |
| 4     | StatefulSet PostgreSQL, PVC, RBAC                          |
| 5     | Prometheus, Grafana, Loki, NetworkPolicy                   |
| 6     | Helm chart, ArgoCD GitOps                                  |
| 7     | EKS/GKE, HPA, TLS cert-manager                            |
| 8     | Exercices CKA/CKAD sur cette base                          |
