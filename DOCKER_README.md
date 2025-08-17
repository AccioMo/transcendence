# Docker Setup for ft_transcendence

## Quick Start

1. **Build and start all services:**
   ```bash
   make up
   ```
   or
   ```bash
   docker-compose up -d
   ```

2. **Access the application:**
   - HTTPS: https://localhost (recommended)
   - HTTP: http://localhost (redirects to HTTPS)

## Commands

- `make build` - Build all Docker images
- `make up` - Start all services in detached mode
- `make down` - Stop all services
- `make logs` - View logs from all services
- `make clean` - Stop services and remove all containers, volumes, and images
- `make restart` - Restart all services

## Architecture

### Services
- **Frontend**: Next.js app (internal network only)
- **Backend**: Node.js API (internal network only)  
- **Nginx**: Reverse proxy with SSL (ports 80/443 exposed)

### Security Features
- ✅ **Private Network**: Frontend and backend only accessible via nginx
- ✅ **Non-root Users**: All containers run as non-privileged users
- ✅ **SSL/TLS**: HTTPS with security headers
- ✅ **Multi-stage Builds**: Optimized frontend container
- ✅ **Volume Persistence**: Database and SSL certificates persisted
- ✅ **Restart Policies**: Auto-restart on failure

### Network Architecture
```
Internet → Nginx (80/443) → Internal Network
                   ↓
            Frontend (3000) ← → Backend (3001)
```

## SSL Certificate

A self-signed SSL certificate is automatically generated for localhost when the nginx container starts. Your browser will show a security warning - this is normal for self-signed certificates in development.

## Volumes

- `backend-data`: Application data persistence
- `ssl-certs`: SSL certificate storage
- Database file mounted directly for development

## Production Notes

- All services run as non-root users for security
- Frontend uses standalone Next.js build for optimal performance
- Nginx includes security headers and modern SSL configuration
- Internal Docker network isolates services from external access