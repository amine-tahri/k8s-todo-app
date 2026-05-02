# 🚀 Feuille de route Kubernetes — Phases & Exercices pratiques

> **Fil conducteur :** À chaque phase, casse volontairement ton setup, documente ce que tu fais, et refais sans copier/coller.

---

## Phase 1 — Prérequis (Linux, Docker, réseau)

**Objectifs :** Maîtriser Linux (commandes, permissions, processus), Docker (images, containers, volumes), et les bases du réseau (TCP/IP, DNS, ports).

### 👉 Mini-projet : "Mon environnement dev containerisé"

**But :** Créer une app simple (API Node.js ou Python Flask), la dockeriser, gérer les volumes et les ports.

**Exercices concrets :**
- Créer un `Dockerfile`
- Lancer plusieurs containers
- Monter un volume pour persister des données
- Simuler un problème réseau (port déjà utilisé, etc.)

**Livrable attendu :**
- `docker-compose.yml` fonctionnel
- App accessible via navigateur (`localhost`)

---

## Phase 2 — Concepts fondamentaux Kubernetes

**Objectifs :** Comprendre l'architecture (Master/Worker nodes), manipuler `kubectl`, écrire des manifests YAML, et naviguer dans les namespaces.

### 👉 Mini-projet : "Mon premier cluster + app déployée"

**But :** Installer un cluster local (minikube ou kind) et déployer une app avec YAML.

**Exercices :**
- Utiliser `kubectl`
- Créer un Pod, puis un Deployment
- Explorer les namespaces
- Débugger avec `kubectl logs` et `kubectl describe`

**Livrable :**
- Fichiers YAML propres et commentés
- App fonctionnelle dans le cluster

---

## Phase 3 — Workloads & réseau

**Objectifs :** Déployer des applications avec Deployments et ReplicaSets, exposer des services, configurer l'Ingress, et gérer les ConfigMaps/Secrets.

### 👉 Mini-projet : "Application web scalable exposée"

**But :** Déployer une app scalable avec accès externe.

**Exercices :**
- Créer un Deployment + ReplicaSet (≥ 3 pods)
- Exposer via Service (`ClusterIP` puis `NodePort`)
- Configurer un Ingress
- Ajouter `ConfigMap` + `Secret`

**Bonus réaliste :** Modifier une config sans redéployer l'image.

**Livrable :**
- URL accessible via navigateur
- Configuration séparée du code

---

## Phase 4 — Stockage & configuration avancée

**Objectifs :** Gérer la persistance avec PV/PVC, comprendre les StatefulSets pour les bases de données, et mettre en place le RBAC.

### 👉 Mini-projet : "App avec base de données persistante"

**But :** Déployer une app + base de données avec persistance des données.

**Exercices :**
- Créer `PersistentVolume` + `PersistentVolumeClaim`
- Déployer une DB (PostgreSQL ou MySQL)
- Utiliser un `StatefulSet`
- Mettre en place RBAC (utilisateur à accès limité)

**Test important :** Supprimer un pod → vérifier que les données sont toujours présentes.

**Livrable :**
- Persistance des données validée
- Accès sécurisé configuré

---

## Phase 5 — Observabilité & sécurité

**Objectifs :** Surveiller avec Prometheus/Grafana, centraliser les logs, et appliquer des politiques réseau et de sécurité des pods.

### 👉 Mini-projet : "Cluster monitoré et sécurisé"

**But :** Ajouter visibilité et sécurité au cluster.

**Exercices :**
- Installer Prometheus + Grafana
- Visualiser CPU/mémoire des pods
- Centraliser les logs (Loki ou ELK)
- Ajouter des `NetworkPolicy`
- Sécuriser les Pods avec `securityContext`

**Livrable :**
- Dashboard Grafana fonctionnel
- Monitoring des pods actif
- Restrictions réseau en place

---

## Phase 6 — Helm & CI/CD

**Objectifs :** Packager des applications avec Helm, automatiser les déploiements avec ArgoCD ou FluxCD (approche GitOps).

### 👉 Mini-projet : "Pipeline GitOps complet"

**But :** Automatiser entièrement les déploiements.

**Exercices :**
- Créer un chart Helm
- Versionner l'app dans Git
- Déployer avec Argo CD ou Flux CD
- Simuler une mise à jour via un simple commit

**Test clé :** `git push` → déploiement automatique sans commande `kubectl`.

**Livrable :**
- Repo Git structuré (app + infra)
- Déploiement 100% automatisé

---

## Phase 7 — Cloud & production

**Objectifs :** Utiliser les services managés (EKS, GKE, AKS), mettre en place l'auto-scaling (HPA, Cluster Autoscaler), et optimiser les coûts.

### 👉 Mini-projet : "Déploiement cloud scalable"

**But :** Passer en environnement de production réel.

**Exercices :**
- Déployer sur Amazon EKS, Google GKE ou Azure AKS
- Configurer le HPA (Horizontal Pod Autoscaler)
- Tester l'auto-scaling sous charge
- Optimiser les coûts (`requests` / `limits`)

**Test réaliste :** Simuler du trafic avec un load test (k6, hey, etc.).

**Livrable :**
- App publique avec URL accessible
- Scaling automatique fonctionnel et vérifié

---

## Phase 8 — Certification

**Objectifs :** Préparer et passer les certifications officielles CKA (administrateur), CKAD (développeur), ou CKS (sécurité).

### 👉 Mini-projet : "Simulation d'examen réel"

**But :** Être prêt pour CKA / CKAD / CKS.

**Exercices :**
- Résoudre des labs chronométrés
- Débugger un cluster cassé
- Écrire du YAML sans aide extérieure

**Challenge final :** Recréer un cluster complet from scratch en temps limité.

**Livrable :**
- Série de labs réussis en moins du temps imparti
- Score ≥ 75% sur [killer.sh](https://killer.sh)

---

## 💡 Conseil important (souvent négligé)

> À chaque phase :
> 1. **Casse volontairement** ton setup
> 2. **Documente** ce que tu fais (journal, README, notes)
> 3. **Refais** sans copier/coller
