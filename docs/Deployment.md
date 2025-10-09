# VP Website — Deployment Guide (Hostinger VPS)

**Version:** v1.0  
**Last Updated:** 2025-10-09  
**Related PRD:** [PRD.md](./PRD.md) | [Architecture.md](./Architecture.md)

---

## 1. Deployment Overview

This guide covers deploying the VP Website (Lasight frontend + Darkone backend) from Lovable to a Hostinger VPS using Docker or PM2 + NGINX.

**Target Environment:**
- **Platform:** Hostinger VPS
- **OS:** Ubuntu 22.04 LTS
- **Web Server:** NGINX (reverse proxy)
- **Process Manager:** Docker (recommended) or PM2
- **SSL:** Let's Encrypt (Certbot)
- **Domain:** vp-suriname.com (example)

---

## 2. Prerequisites

### 2.1 VPS Requirements

**Minimum Specifications:**
- 2 vCPU
- 4GB RAM
- 40GB SSD storage
- Ubuntu 22.04 LTS

### 2.2 Access Requirements

- Root or sudo access to VPS
- SSH key pair for authentication
- Domain name configured with Hostinger DNS

### 2.3 Software to Install

- Node.js 20+ (if using PM2)
- Docker & Docker Compose (if using Docker)
- NGINX
- Certbot (for SSL)
- Git

---

## 3. Initial VPS Setup

### 3.1 Connect to VPS

```bash
ssh root@your-vps-ip
```

### 3.2 Update System

```bash
apt update && apt upgrade -y
```

### 3.3 Create Non-Root User

```bash
adduser deployer
usermod -aG sudo deployer
su - deployer
```

### 3.4 Configure Firewall

```bash
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
sudo ufw status
```

### 3.5 Install Git

```bash
sudo apt install git -y
```

---

## 4. Option A: Docker Deployment (Recommended)

### 4.1 Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo apt install docker-compose -y

# Verify installation
docker --version
docker-compose --version
```

### 4.2 Clone Repository

```bash
cd /var/www
sudo mkdir vp-website
sudo chown deployer:deployer vp-website
git clone https://github.com/your-org/vp-website.git vp-website
cd vp-website
```

### 4.3 Create Docker Files

**Dockerfile (Frontend):**

```dockerfile
# File: Dockerfile.frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Dockerfile (Backend - if separate build):**

```dockerfile
# File: Dockerfile.backend
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx-admin.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    container_name: vp-frontend
    ports:
      - "3000:80"
    environment:
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
    restart: always
    networks:
      - vp-network

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    container_name: vp-backend
    ports:
      - "3001:80"
    environment:
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
    restart: always
    networks:
      - vp-network

networks:
  vp-network:
    driver: bridge
```

### 4.4 Create Environment Variables

```bash
# Create .env file
nano .env
```

Add:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4.5 Build and Run Containers

```bash
docker-compose up -d --build
```

### 4.6 Verify Containers

```bash
docker ps
docker logs vp-frontend
docker logs vp-backend
```

---

## 5. Option B: PM2 Deployment

### 5.1 Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
```

### 5.2 Install PM2

```bash
sudo npm install -g pm2
pm2 --version
```

### 5.3 Clone Repository

```bash
cd /var/www
sudo mkdir vp-website
sudo chown deployer:deployer vp-website
git clone https://github.com/your-org/vp-website.git vp-website
cd vp-website
```

### 5.4 Build Project

```bash
npm install
npm run build
```

### 5.5 Serve with PM2 (using serve)

```bash
npm install -g serve
pm2 serve dist 3000 --name vp-frontend --spa
pm2 serve dist/admin 3001 --name vp-backend --spa
pm2 save
pm2 startup
```

### 5.6 Verify PM2 Processes

```bash
pm2 status
pm2 logs
```

---

## 6. NGINX Configuration

### 6.1 Install NGINX

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 6.2 Create NGINX Config

```bash
sudo nano /etc/nginx/sites-available/vp-website
```

**NGINX Configuration:**

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name vp-suriname.com www.vp-suriname.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name vp-suriname.com www.vp-suriname.com;

    # SSL Configuration (will be added by Certbot)
    # ssl_certificate /etc/letsencrypt/live/vp-suriname.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/vp-suriname.com/privkey.pem;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    # Frontend (Lasight) - Main site
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend (Darkone) - Admin panel
    location /admin {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### 6.3 Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/vp-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 7. SSL Certificate (Let's Encrypt)

### 7.1 Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 7.2 Obtain Certificate

```bash
sudo certbot --nginx -d vp-suriname.com -d www.vp-suriname.com
```

Follow prompts:
- Enter email address
- Agree to Terms of Service
- Choose to redirect HTTP to HTTPS (recommended: Yes)

### 7.3 Verify Auto-Renewal

```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

---

## 8. DNS Configuration

### 8.1 Hostinger DNS Settings

Log in to Hostinger control panel and configure DNS:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | your-vps-ip | 3600 |
| A | www | your-vps-ip | 3600 |
| CNAME | admin | vp-suriname.com | 3600 |

Wait 10-60 minutes for DNS propagation.

### 8.2 Verify DNS

```bash
dig vp-suriname.com
dig www.vp-suriname.com
```

---

## 9. Continuous Deployment (Optional)

### 9.1 GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to VPS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/vp-website
            git pull origin main
            docker-compose down
            docker-compose up -d --build
            docker system prune -f
```

**GitHub Secrets:**
- `VPS_HOST`: VPS IP address
- `VPS_USER`: deployer
- `VPS_SSH_KEY`: Private SSH key

---

## 10. Monitoring & Logging

### 10.1 Docker Logs

```bash
docker logs -f vp-frontend
docker logs -f vp-backend
```

### 10.2 PM2 Logs

```bash
pm2 logs
pm2 monit
```

### 10.3 NGINX Logs

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 10.4 System Resources

```bash
htop
df -h
free -m
```

---

## 11. Backup & Restore

### 11.1 Database Backup (Supabase)

**Automatic:** Supabase handles database backups (7-30 days retention depending on plan).

**Manual Backup:**

```bash
# Export database schema
curl -X GET "https://[PROJECT_REF].supabase.co/rest/v1/" \
  -H "apikey: [ANON_KEY]" \
  -H "Authorization: Bearer [SERVICE_ROLE_KEY]" \
  > backup.sql
```

### 11.2 Code Backup

**Strategy:** Git version control (already on GitHub)

**Restore:**

```bash
cd /var/www/vp-website
git fetch --all
git checkout [commit-hash or tag]
docker-compose up -d --build
```

### 11.3 Uploaded Files Backup (Supabase Storage)

**Manual Download:**

```bash
# Use Supabase CLI or dashboard to export storage buckets
supabase storage download --bucket media-uploads
```

---

## 12. Troubleshooting

### 12.1 Cannot Connect to Website

**Check:**
1. Docker/PM2 processes running: `docker ps` or `pm2 status`
2. NGINX running: `sudo systemctl status nginx`
3. Firewall rules: `sudo ufw status`
4. DNS propagation: `dig vp-suriname.com`
5. SSL certificate valid: `sudo certbot certificates`

### 12.2 502 Bad Gateway

**Causes:**
- Backend not running
- Wrong proxy_pass port in NGINX config
- Docker container crashed

**Fix:**

```bash
# Check backend status
docker ps
pm2 status

# Restart services
docker-compose restart
pm2 restart all

# Check NGINX config
sudo nginx -t
sudo systemctl reload nginx
```

### 12.3 SSL Certificate Errors

**Fix:**

```bash
# Renew certificate
sudo certbot renew

# Check certificate status
sudo certbot certificates

# Test renewal
sudo certbot renew --dry-run
```

### 12.4 Out of Disk Space

**Check:**

```bash
df -h
```

**Clean up Docker:**

```bash
docker system prune -a
docker volume prune
```

---

## 13. Deployment Checklist

### Pre-Deployment

- [ ] Code tested locally
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Supabase project configured
- [ ] Domain DNS configured

### Deployment

- [ ] VPS provisioned and secured
- [ ] Firewall configured (UFW)
- [ ] SSH hardened (key-only authentication)
- [ ] Docker or PM2 installed
- [ ] NGINX installed and configured
- [ ] SSL certificate obtained (Let's Encrypt)
- [ ] Application deployed and running
- [ ] Health checks passing

### Post-Deployment

- [ ] Website accessible via domain
- [ ] HTTPS working correctly
- [ ] Admin panel accessible
- [ ] Authentication working
- [ ] Content displays correctly
- [ ] Forms submitting successfully
- [ ] Monitoring configured
- [ ] Backups scheduled
- [ ] Team trained on deployment process

---

## 14. Rollback Procedure

If deployment fails:

1. **Stop current deployment:**
   ```bash
   docker-compose down
   # or
   pm2 stop all
   ```

2. **Checkout previous version:**
   ```bash
   git log --oneline
   git checkout [previous-commit-hash]
   ```

3. **Rebuild and restart:**
   ```bash
   docker-compose up -d --build
   # or
   pm2 restart all
   ```

4. **Verify rollback:**
   ```bash
   curl https://vp-suriname.com
   ```

---

**Document Control:**  
**Author:** DevOps Team  
**Next Review:** After successful deployment  
**Change Log:** Initial version — 2025-10-09
