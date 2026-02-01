# Dockerfile

## Mục tiêu học tập

- Hiểu Dockerfile và vai trò của nó
- Nắm vững các instructions
- Tạo custom images
- Áp dụng best practices
- Sử dụng multi-stage builds

## 1. Dockerfile là gì?

Dockerfile là text file chứa instructions để build Docker image.

### Workflow:

```
Dockerfile → docker build → Docker Image → docker run → Container
```

### Ví dụ đơn giản:

```dockerfile
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y nginx
CMD ["nginx", "-g", "daemon off;"]
```

## 2. Dockerfile Instructions

### FROM

Base image cho container.

```dockerfile
# Official image
FROM ubuntu:20.04

# Specific version
FROM node:18-alpine

# Multi-stage build
FROM maven:3.8-openjdk-17 AS build
```

### WORKDIR

Thiết lập working directory.

```dockerfile
WORKDIR /app

# Tương đương với:
# RUN mkdir -p /app
# CD /app
```

### COPY và ADD

Copy files từ host vào image.

```dockerfile
# COPY (recommended)
COPY source dest
COPY package.json /app/
COPY . /app/

# ADD (có thêm features)
ADD https://example.com/file.tar.gz /app/
ADD archive.tar.gz /app/  # Auto extract
```

**Best Practice**: Dùng COPY trừ khi cần features của ADD

### RUN

Execute commands trong image build.

```dockerfile
# Shell form
RUN apt-get update
RUN npm install

# Exec form (recommended)
RUN ["apt-get", "update"]

# Chaining commands
RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean
```

### CMD

Default command khi run container.

```dockerfile
# Exec form (recommended)
CMD ["nginx", "-g", "daemon off;"]

# Shell form
CMD nginx -g "daemon off;"

# As parameters to ENTRYPOINT
CMD ["param1", "param2"]
```

**Note**: Chỉ có 1 CMD trong Dockerfile

### ENTRYPOINT

Configure container để chạy như executable.

```dockerfile
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# Có thể override CMD
ENTRYPOINT ["java", "-jar"]
CMD ["app.jar"]

# Run: docker run image custom.jar
# → java -jar custom.jar
```

### EXPOSE

Document port mà container listen.

```dockerfile
EXPOSE 80
EXPOSE 8080
EXPOSE 3000/tcp
```

**Note**: Chỉ là documentation, không publish port

### ENV

Thiết lập environment variables.

```dockerfile
ENV NODE_ENV=production
ENV APP_HOME=/app \
    APP_USER=appuser

# Sử dụng
RUN echo $APP_HOME
```

### ARG

Build-time variables.

```dockerfile
ARG VERSION=1.0
ARG BUILD_DATE

RUN echo "Building version $VERSION"

# Build with custom value:
# docker build --build-arg VERSION=2.0 .
```

### VOLUME

Tạo mount point cho persistent data.

```dockerfile
VOLUME /data
VOLUME /var/log/myapp

# Or
VOLUME ["/data", "/logs"]
```

### USER

Thiết lập user để run commands.

```dockerfile
RUN adduser --disabled-password myuser
USER myuser

# All commands sau đây run với user myuser
```

### LABEL

Add metadata vào image.

```dockerfile
LABEL version="1.0"
LABEL description="My application"
LABEL maintainer="developer@example.com"
```

## 3. Ví dụ Complete Dockerfile

### Java Spring Boot Application:

```dockerfile
# Multi-stage build

# Stage 1: Build
FROM maven:3.8-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENV JAVA_OPTS=""
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
```

### Node.js Application:

```dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "server.js"]
```

### Python Flask Application:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

ENV FLASK_APP=app.py
ENV FLASK_ENV=production

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]
```

## 4. Building Images

```bash
# Basic build
docker build .

# Tag image
docker build -t myapp:1.0 .
docker build -t myusername/myapp:latest .

# Build from different Dockerfile
docker build -f Dockerfile.prod .

# Build with build args
docker build --build-arg VERSION=2.0 .

# No cache
docker build --no-cache .

# View build history
docker history myapp:1.0
```

## 5. .dockerignore File

Tương tự .gitignore, exclude files khỏi build context.

```
# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.vscode
.idea
*.md
target/
```

## 6. Best Practices

### 1. Use Official Base Images

```dockerfile
# Good
FROM node:18-alpine

# Avoid
FROM ubuntu
RUN apt-get install nodejs
```

### 2. Minimize Layers

```dockerfile
# Bad: Multiple layers
RUN apt-get update
RUN apt-get install -y nginx
RUN apt-get clean

# Good: Single layer
RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

### 3. Order Matters (Leverage Cache)

```dockerfile
# Good: Dependencies first (cache)
COPY package.json .
RUN npm install
COPY . .

# Bad: Copy all first (cache invalidated often)
COPY . .
RUN npm install
```

### 4. Use Specific Tags

```dockerfile
# Good
FROM node:18.16-alpine

# Bad
FROM node:latest
```

### 5. Don't Run as Root

```dockerfile
RUN adduser --disabled-password appuser
USER appuser
```

### 6. Use .dockerignore

Giảm build context size.

### 7. Multi-stage Builds

Giảm final image size.

## 7. Multi-stage Builds

Build application và chỉ copy artifacts cần thiết.

```dockerfile
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Ưu điểm:

- Image nhỏ hơn
- Bảo mật hơn (không chứa build tools)
- Tách biệt build và runtime

## 8. Optimizing Image Size

### Before:

```dockerfile
FROM ubuntu:20.04
RUN apt-get update
RUN apt-get install -y python3 python3-pip
COPY . /app
WORKDIR /app
RUN pip3 install -r requirements.txt
CMD ["python3", "app.py"]
```

**Size**: ~500MB

### After:

```dockerfile
FROM python:3.11-alpine
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

**Size**: ~50MB

## Bài tập

### Bài 1: Simple Dockerfile

Tạo Dockerfile cho static HTML website:

```dockerfile
# Base: nginx:alpine
# Copy HTML files vào /usr/share/nginx/html
# Expose port 80
```

### Bài 2: Java Application

Tạo Dockerfile cho Spring Boot app:

```dockerfile
# Multi-stage build
# Stage 1: Maven build
# Stage 2: Run với JRE
```

### Bài 3: Python Flask App

```dockerfile
# Base: python:3.11-slim
# Copy requirements.txt và install
# Copy source code
# Expose 5000
# Run flask
```

### Bài 4: Node.js App

Tạo Dockerfile với best practices:

- Use alpine base
- Proper layer ordering
- Multi-stage build
- Non-root user

### Bài 5: Optimization Challenge

Optimize Dockerfile để giảm image size:

- Sử dụng alpine
- Multi-stage build
- Minimize layers
- Clean up cache

## Câu hỏi ôn tập

1. Sự khác biệt giữa COPY và ADD?
2. CMD và ENTRYPOINT khác nhau như thế nào?
3. ARG và ENV khác nhau ra sao?
4. Tại sao nên minimize layers?
5. Multi-stage build là gì? Ưu điểm?
6. .dockerignore có tác dụng gì?
7. Tại sao nên dùng alpine images?
8. Layer caching hoạt động như thế nào?
