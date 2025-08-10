# PulseBoard – Simple Full-Stack DevOps + Monitoring + NLP Demo

📌 Project Overview
PulseBoard Simple is an internal web application designed to monitor backend service metrics in real time.
It features:

Backend API built with Node.js & Express.

Frontend UI built with React.js, Tailwind CSS, Chart.js, and Recharts.

Real-time monitoring using Prometheus and Grafana.

Containerized deployment using Docker & Docker Compose.

CI/CD pipeline integration using GitHub Actions.

The project replicates a real-world DevOps workflow where backend and frontend services are integrated with monitoring tools for system health tracking.

🛠️ Tech Stack
Frontend
React.js (component-based UI)

Tailwind CSS (responsive design)

Chart.js & Recharts (data visualization)

Backend
Node.js (Express API)

/metrics endpoint for Prometheus scraping

Monitoring
Prometheus for collecting metrics

Grafana for visualizing metrics

DevOps
Docker & Docker Compose (containerization & orchestration)

GitHub Actions (CI/CD pipeline)

🚀 How to Run the Project Locally
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/pulseboard-simple.git
cd pulseboard-simple
2️⃣ Start Services
bash
Copy
Edit
docker compose up -d --build
3️⃣ Access Services
Frontend: http://localhost:3000

Prometheus: http://localhost:9090

Grafana: http://localhost:3001

📊 Prometheus & Grafana Setup
Prometheus scrapes the backend /metrics endpoint every 15s.

Grafana is pre-configured with a dashboard for service uptime & request performance.

💡 Challenges Faced & Solutions
1. Port Conflicts
Problem: Docker Compose failed to start because port 8080 was already in use.

Solution: Identified the process using netstat -ano & killed it with:

bash
Copy
Edit
taskkill /PID <PID> /F
2. Prometheus Target Down
Problem: Prometheus showed backend:8080 as down.

Solution: Updated Prometheus config to match backend service name in Docker network.

3. Frontend “Site Not Reached” Error
Problem: React app failed to load after container start.

Solution: Ensured nginx was serving the /dist build output & rebuilt containers.

4. Grafana Plugin Installation Delays
Problem: Grafana took time to install default plugins during first run.

Solution: Allowed initial boot time and verified logs with:

bash
Copy
Edit
docker logs -f grafana
5. CI/CD Integration
Problem: Needed automated build/test on GitHub.

Solution: Created .github/workflows/ci-cd.yml to build and test containers on push.

📦 Deployment Workflow
Code changes pushed to main branch.

GitHub Actions CI builds backend & frontend containers.

Docker Compose used for local development.

Prometheus & Grafana containers deployed for monitoring.

🏆 Outcome
Successfully deployed a full-stack monitoring solution locally.

Integrated DevOps practices: CI/CD, containerization, monitoring.

Documented all steps & challenges for reproducibility.

