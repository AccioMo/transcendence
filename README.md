# Transcendence (42 Project)

A full-stack project for the 42 school "Transcendence" assignment. This repository contains a Fastify-based backend (Node.js) and a Next.js frontend, plus an Nginx service for reverse-proxying. The project supports local development and Docker-based deployment via `docker-compose`.

## What you'll find here

- `backend/` – Fastify API, controllers, models, and services.
- `frontend/` – Next.js app (React + TypeScript).
- `nginx/` – Nginx Docker image and configuration used as a reverse proxy.
- `docker-compose.yml` – Compose file to run frontend, backend and nginx together.

## Tech stack

- Backend: Node.js, Fastify, SQLite (and optional Postgres drivers present), Socket.IO
- Frontend: Next.js, React, Tailwind CSS
- Other: Docker, Nginx

## Quick start (development)

Prerequisites:

- Node.js (v18+ recommended)
- Yarn or npm
- Docker & Docker Compose (if you plan to use containers)

Run backend locally:

```powershell
cd backend
# install deps (choose npm or yarn)
npm install
# or: yarn

# start in dev mode
npm run dev
```

Run frontend locally:

```powershell
cd frontend
npm install
npm run dev
```

Open the frontend at http://localhost:3000 by default and the backend at the port configured in `.env` (default: 8000).

## Using Docker (recommended for full stack)

The repository includes a `docker-compose.yml` that builds and runs the frontend, backend and nginx services together.

From the repository root:

```powershell
docker compose up --build
```

This will:

- build `frontend` and `backend` images from the local Dockerfiles
- start `nginx` and expose ports `80` and `443` (as configured in `nginx/Dockerfile` and `nginx/nginx.conf`)

To stop and remove containers:

```powershell
docker compose down
```

## Environment variables

Example variables are stored in `.env.example`. Copy or rename that file to `.env` and adjust values for your environment.

Main entries from `.env.example`:

- `NODE_ENV` (development|production)
- `PORT` (backend port, default `8000`)
- `HOST` (backend host, e.g. `0.0.0.0`)
- `FRONTEND_PORT` (frontend port, default `3000`)
- `FRONTEND_HOSTNAME` (frontend host, e.g. `0.0.0.0`)

There are more configuration options used by plugins and services (OAuth, SMTP, JWT). Check `backend/src/Options` and `backend/src/Services` for additional env keys required in production.

## Data persistence

- The backend uses `backend/app.db` (SQLite) by default. The `docker-compose.yml` binds `./backend/app.db` into the container so database contents are persisted locally.

## Useful scripts

- Backend: `npm run dev` (dev) and `npm start` (production)
- Frontend: `npm run dev`, `npm run build`, `npm start`

## Project structure (high level)

- `backend/src/Controllers` – route handlers
- `backend/src/Models` – data models
- `backend/src/Services` – email, oauth and other logic
- `frontend/app` and `frontend/components` – Next.js pages and UI components

## Contributing

If you want to contribute, open an issue or a pull request. Keep changes small and add tests where appropriate. Follow the repository code style.

## Notes

- This README provides a practical developer-focused entry point. For production deployments, review `nginx/` configuration, SSL cert handling (`ssl-certs` volume in `docker-compose.yml`), and secure environment variables (don't commit secrets).
- Some third-party configuration (OAuth credentials, SMTP) must be supplied via environment variables before production use.

---

If you want, I can also:

- add a `CONTRIBUTING.md` with a development checklist,
- generate a sample `.env` file with commented placeholders for common keys,
- or create small PowerShell scripts to automate common dev tasks.
