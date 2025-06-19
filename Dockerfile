# ----------- Builder Stage -------------
FROM node:20 AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci --prefer-offline --no-audit

# Copy all project files
COPY . .

# 👉 Step 1: Build Admin UI before main build
RUN yarn build:admin

# 👉 Step 2: Then build backend and copy admin-ui
RUN yarn build

# ----------- Production Stage ----------
FROM node:20-slim AS production
WORKDIR /app

# Install PM2 and tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl wget && \
    rm -rf /var/lib/apt/lists/*
RUN npm install -g pm2

# Copy app from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/static ./static

# ✅ Admin UI copy (now it will exist)
COPY --from=builder /app/admin-ui/dist /app/admin-ui/dist

# Create PM2 ecosystem file
RUN echo '{\
  "apps": [\
    {"name": "server", "script": "dist/index.js", "instances": 1},\
    {"name": "worker", "script": "dist/index-worker.js", "instances": 1}\
  ]\
}' > ecosystem.config.json

# Ports and health check
EXPOSE 80
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/health || exit 1

CMD ["pm2-runtime", "ecosystem.config.json"]
