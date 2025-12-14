# 🚀 Node.js Observability & Performance Monitoring System

A **production‑grade observability platform** for Node.js applications using **Prometheus, Grafana, Docker,Loki and Express**. This project provides real‑time insights into API latency,Info logs,Total request Received, error rates, CPU usage, event loop lag, and application health through a custom Grafana dashboard.

---

## 📌 Project Overview

Modern backend systems require **visibility, reliability, and performance guarantees**. This project implements a complete monitoring and observability pipeline for a Node.js application by collecting metrics, exposing them to Prometheus, and visualizing them in Grafana.

The system is capable of:

* Tracking **API response latency (p95, p99)**
* Monitoring **error logs and failures**
* Observing **CPU usage and event loop lag**
* Identifying **slow endpoints**
* Supporting **production‑style dashboards**

---
![WhatsApp Image 2025-12-14 at 11 44 45 AM](https://github.com/user-attachments/assets/edff4f37-0bbf-4aa3-8ec5-3ade03868e6d)
![WhatsApp Image 2025-12-14 at 11 45 26 AM](https://github.com/user-attachments/assets/3c282b46-8a87-4daa-9b65-7f33e3c884b3)

## 🧠 Key Features

* 📊 **Real-Time Metrics Collection** using Prometheus
* ⏱️ **Latency Monitoring** with histogram & quantiles (p50 / p95 / p99)
*  **Centralized Log Collection** using **Grafana Loki**
* 🔎 **Log Querying with LogQL** (errors, slow endpoints, patterns)
* ⚙️ **Process Metrics** (CPU usage, restarts)
* 🧵 **Event Loop Lag Monitoring** (Node.js specific)
* 🐳 **Dockerized Setup** for easy deployment
* 📈 **Unified Grafana Dashboard** for metrics + logs

---
![WhatsApp Image 2025-12-14 at 11 45 44 AM](https://github.com/user-attachments/assets/71134f23-9f63-4b75-a511-833a2889da8c)

## 🏗️ System Architecture

```
Node.js Application
   │        │
   │        ├── /metrics  → Prometheus (metrics)
   │        │
   │        └── logs      → Loki (logs)
   │
   ▼
Prometheus            Loki
   │                  │
   │  time-series     │  structured logs
   ▼                  ▼
        Grafana (Single Pane of Glass)
```

Node.js Application
│
│  /metrics (Prometheus format)
▼
Prometheus Server
│
│  Time‑series metrics
▼
Grafana Dashboard

```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-----|-----------|
| Backend | Node.js, Express |
| Metrics | prom-client |
| Logs | Grafana Loki |
| Monitoring | Prometheus |
| Visualization | Grafana |
| Containerization | Docker |

-----|-----------|
| Backend | Node.js, Express |
| Metrics | prom-client |
| Monitoring | Prometheus |
| Visualization | Grafana |
| Containerization | Docker |

---

## 📂 Project Structure

```

project-root/
│
├── index.js            # Express server
├── util.js             # Heavy task & latency simulation
├── package.json
├── Dockerfile
├── prometheus.yml      # Prometheus config
├── docker-compose.yml  # Grafana + Prometheus setup
└── README.md

![WhatsApp Image 2025-12-14 at 11 48 01 AM](https://github.com/user-attachments/assets/07b3c09c-9036-4dd1-acd1-d73622ee0da1)
````

---

## ⚙️ Application Endpoints

| Endpoint | Description |
|-------|-------------|
| `/` | Health check |
| `/slow` | Simulates slow API with random latency/errors |
| `/metrics` | Exposes Prometheus metrics |

---

## 📈 Metrics Collected

- `http_req_res_time_seconds_bucket` – API latency histogram
- `http_requests_total` – Total API requests
- `process_cpu_user_seconds_total` – CPU usage
- `nodejs_eventloop_lag_seconds` – Event loop lag
- Custom error & log counters

---

## 📊 Grafana Dashboard Panels

- 🔹 API Latency (p95 / p99)
- 🔹 Slow Endpoint Detection
- 🔹 Request Volume Gauge
- 🔹 Error Rate Monitoring
- 🔹 **Centralized Error Logs (Loki)**
- 🔹 Log Search & Filtering (LogQL)
- 🔹 Process CPU Usage
- 🔹 Event Loop Lag
- 🔹 Process Restart Counter

---

## 🐳 Docker Setup

### Start Prometheus
```bash
docker run -d -p 9090:9090 --name=prometheus prom/prometheus
````
![WhatsApp Image 2025-12-14 at 11 48 52 AM](https://github.com/user-attachments/assets/7b65f1a0-9b9e-4124-a44a-0d2d9f89ed07)
### Start Grafana

```bash
docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
```

Access:

* Grafana → [http://localhost:3000](http://localhost:3000)
* Prometheus → [http://localhost:9090](http://localhost:9090)

---

## 📊 PromQL Example (p95 Latency)

```promql
histogram_quantile(
  0.95,
  sum by (le, route) (
    rate(http_req_res_time_seconds_bucket{route!="/metrics"}[$__rate_interval])
  )
)
```

---

## 🎯 Use Cases

* Production API monitoring
* Performance debugging
* SLA/SLO tracking
* DevOps / SRE learning

---
![WhatsApp Image 2025-12-14 at 11 52 01 AM](https://github.com/user-attachments/assets/85d16594-6920-4316-88d2-b500c4ccedc8)
![WhatsApp Image 2025-12-14 at 11 50 40 AM](https://github.com/user-attachments/assets/52c8988f-3923-4f5a-9eb7-7e37736071e7)

## 🚀 Future Enhancements

* 🚨 Alertmanager integration
* 🧠 AI-based anomaly detection on metrics & logs
* 🔗 Metrics–Logs correlation (click metric → view logs)
* 📉 Auto-scaling recommendations
* 🔍 Distributed tracing (OpenTelemetry)

---

## 👤 Author

**Abhijit Ranjan**
for any query email to-abhijitgyan121@gmail.com
Node.js | Monitoring | Observability | DevOps

---

## ⭐ If you find this useful

Give the repo a ⭐ and feel free to fork or contribute.

---

## 📜 License

This project is licensed under the MIT License.
