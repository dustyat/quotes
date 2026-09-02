# ---- 阶段 1: 构建静态产物 ----
FROM node:20-alpine AS builder

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm ci

# 复制源码并执行纯静态构建
COPY . .
RUN npm run build

# ---- 阶段 2: 高性能 Nginx 静态服务 (极轻量，<25MB) ----
FROM nginx:alpine

# 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制 dist 静态文件到 Nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
