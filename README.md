# PulseBoard – Simple Full-Stack DevOps + Monitoring + NLP Demo

This is a **small, runnable** project that matches your resume bullets:

- Node.js (Express) backend APIs
- React + Tailwind CSS frontend with **Recharts** and **Chart.js**
- Prometheus metrics + Grafana dashboard (pilot)
- Docker + Helm for containerization and k8s
- GitHub Actions + Jenkins + Spinnaker skeleton for CI/CD
- PM2 for zero-downtime process management
- Simple **NLP sentiment** over ~10k mock reviews

## Quickstart (Local Dev)
Backend:
```bash
cd backend
npm install
npm run dev
# http://localhost:8080/api/health
# http://localhost:8080/metrics
# http://localhost:8080/api/sentiment/summary
```

Frontend (new terminal):
```bash
cd frontend
npm install
npm run dev
# http://localhost:5173
```

## Docker Compose (includes Prometheus & Grafana)
```bash
docker compose up --build
# Frontend  : http://localhost:3000
# Backend   : http://localhost:8080
# Prometheus: http://localhost:9090
# Grafana   : http://localhost:3001 (login: admin / admin)
```

## Helm (Kubernetes) – app only (frontend + backend)
```bash
cd k8s/helm
helm upgrade --install pulseboard . -f values.yaml
kubectl port-forward svc/pulseboard-frontend 3000:80
```

> Replace Docker image names in `k8s/helm/values.yaml` and CI files with your Docker Hub handle before real use.
