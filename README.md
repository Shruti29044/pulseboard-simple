# Pulseboard Simple

A full-stack internal monitoring and analytics dashboard built with:
- **Backend:** Node.js (Express) + PM2
- **Frontend:** React.js + Tailwind CSS + Chart.js + Recharts
- **Monitoring:** Prometheus & Grafana
- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions
- **Orchestration (Optional):** Helm/Kubernetes
- **Process Management:** PM2 for zero-downtime reloads

---

## 📌 Features
- Dynamic, responsive UI with **Tailwind CSS**
- Interactive real-time charts using **Chart.js** and **Recharts**
- Backend API served by **Express** with Prometheus `/metrics` endpoint
- **PM2** for production process management (cluster mode)
- Monitoring stack:
  - **Prometheus** scrapes backend metrics
  - **Grafana** visualizes metrics
- Dockerized full stack (frontend, backend, Prometheus, Grafana)
- GitHub Actions pipeline for CI/CD

---

## 🛠 Tech Stack
| Layer         | Technology |
|---------------|------------|
| Frontend      | React.js, Tailwind CSS, Chart.js, Recharts |
| Backend       | Node.js, Express.js, PM2 |
| Monitoring    | Prometheus, Grafana |
| Container     | Docker, Docker Compose |
| CI/CD         | GitHub Actions |
| Deployment    | PM2, Docker |
| Optional      | Helm (for K8s deployment) |

---

## 📂 Project Structure
```

pulseboard-simple/
├── backend/
│   ├── src/
│   │   └── index.js
│   ├── data/
│   ├── package.json
│   ├── Dockerfile
│   ├── ecosystem.config.js
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
├── prometheus/
│   └── prometheus.yml
├── docker-compose.yml
└── .github/
└── workflows/
└── ci-cd.yml

````

---

## 🚀 Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Shruti29044/pulseboard-simple.git
cd pulseboard-simple
````

### 2️⃣ Build and Start Services

```bash
docker compose up -d --build
```

This starts:

* **Backend (PM2)** → `http://localhost:8080`
* **Frontend** → `http://localhost:3000`
* **Prometheus** → `http://localhost:9090`
* **Grafana** → `http://localhost:3001`

### 3️⃣ Check PM2 Processes (inside backend container)

```bash
docker compose exec backend sh
pm2 ls
```

---

## 📊 Monitoring

* Prometheus scrapes backend metrics from `/metrics`
* Grafana dashboards visualize metrics

Prometheus UI:

```
http://localhost:9090
```

Grafana UI:

```
http://localhost:3001
```

Default Grafana login:

* **Username:** admin
* **Password:** admin

---

## 🔄 CI/CD with GitHub Actions

The workflow file: `.github/workflows/ci-cd.yml`

**What it does:**

* Runs `npm install` for frontend and backend
* Runs build for frontend
* Runs backend tests
* (Optional) Builds Docker images and pushes to Docker Hub

Trigger:

* On every push to `main` branch

---

## 💡 PM2 Commands

Local Dev with Watch Mode:

```bash
npm run pm2:dev
```

Stop All Processes:

```bash
npm run pm2:stop
```

List All Processes:

```bash
npm run pm2:list
```

---

## 🧠 Challenges Faced & Solutions

### 1. **Port Conflicts**

* **Issue:** Docker failed with `Only one usage of each socket address...`
* **Cause:** Ports like `8080` and `3000` already in use locally.
* **Solution:** Stopped conflicting processes using:

  ```bash
  netstat -ano | findstr :8080
  taskkill /PID <pid> /F
  ```

### 2. **Prometheus Scraping Error**

* **Issue:** `Error scraping target: no such host`
* **Cause:** Wrong service name in Prometheus config.
* **Solution:** Updated `prometheus.yml` to use correct Docker service name.

### 3. **Grafana Plugin Installation Delay**

* **Issue:** Grafana plugins downloaded on container start slowed startup.
* **Solution:** Pre-install plugins in Dockerfile or wait for background installer.

### 4. **Git Push Rejected**

* **Issue:** Remote branch ahead, causing push rejection.
* **Solution:**

  ```bash
  git pull origin main --rebase
  git push origin main
  ```

### 5. **Switching Backend to PM2**

* **Steps Taken:**

  * Installed `pm2` in backend dependencies.
  * Created `ecosystem.config.js`.
  * Updated `Dockerfile` to run:

    ```dockerfile
    CMD ["pm2-runtime", "ecosystem.config.js"]
    ```
  * Verified with `pm2 ls` inside container.

### 6.  PM2 'module is not defined' Error

* **Steps Taken:**
  
   *  Cause: Using ES Modules syntax with PM2.
   *  Solution: Rewrote ecosystem.config.js as CommonJS (module.exports = { ... }).

### 7.  Prometheus Not Reachable

   * Cause: Prometheus service not running after Docker restart.
   * Solution: docker compose up -d prometheus
   * Checked readiness: curl http://localhost:9090/-/ready
   * Example Commands Used in Development:
     # Start all services fresh
     
docker compose up -d --build

# Rebuild backend only
docker compose build backend --no-cache

# Restart Prometheus
docker compose up -d --force-recreate prometheus

# Check logs
docker compose logs --no-color backend
docker compose logs --no-color prometheus

# Enter backend container
docker compose exec backend sh

# Test API health
curl http://localhost:8080/api/health

# Check Prometheus readiness
curl http://localhost:9090/-/ready

## 🚀 Process Management with PM2

The backend service is managed using **[PM2](https://pm2.keymetrics.io/)** to ensure high availability, better CPU utilization, and zero-downtime restarts.

### Why PM2?
- **Zero Downtime Restarts** – Seamless restarts without dropping requests.
- **Multi-Core Utilization** – Runs one Node.js process per CPU core.
- **Auto-Restart on Crash** – Keeps the app alive automatically.
- **Built-in Monitoring** – Track CPU, memory, and uptime easily.
- **Graceful Shutdowns** – Handles Docker stop signals correctly.

### PM2 Commands
```bash
# Start in production mode
pm2 start ecosystem.config.js

# Start in watch mode (development)
npm run pm2:dev

# Stop all processes
npm run pm2:stop

# View process list
npm run pm2:list

# View logs
pm2 logs
````

### Docker Integration

The backend Dockerfile uses:

```dockerfile
CMD ["pm2-runtime", "ecosystem.config.js"]
```

This ensures **PM2 manages the process inside the container** with proper signal handling.

---

```

---

💡 **Tip for interviews**:  
When they ask *"How do you ensure zero downtime?"* you can say:  
> *"I used PM2 in cluster mode with Docker. This way, my backend runs on multiple CPU cores and can restart without dropping requests. The PM2 process manager also ensures automatic restarts if something crashes."*

---

```

## 📸 Architecture Overview

```
[ React Frontend ]  -->  [ Express Backend (PM2) ]  -->  [ Prometheus ]
                                                       ↘ [ Grafana ]
```

---

## 📜 License

MIT License

```

---

Do you want me to **add real screenshots** of Prometheus, Grafana, and PM2 output into this README so your GitHub page looks more professional? That would make it stand out a lot.
```
