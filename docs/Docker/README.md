# Nội dung Đào Tạo Docker

## Mục tiêu

Sinh viên được giới thiệu và thực hành containerization, orchestration và deployment với Docker.

## Nội dung chi tiết

### 1. [Docker Cơ bản](./01-Docker-Basics/README.md)

- Docker là gì?
- Container vs Virtual Machine
- Docker architecture
- Docker Engine
- Docker Hub
- Cài đặt Docker
- Docker commands cơ bản:
  - `docker version`
  - `docker info`
  - `docker run`
  - `docker ps`
  - `docker images`
  - `docker pull`
  - `docker stop`
  - `docker rm`
  - `docker rmi`
- Working with containers
- Working with images

### 2. [Dockerfile](./02-Dockerfile/README.md)

- Dockerfile là gì?
- Dockerfile syntax
- Common instructions:
  - FROM
  - WORKDIR
  - COPY và ADD
  - RUN
  - CMD
  - ENTRYPOINT
  - EXPOSE
  - ENV
  - ARG
  - VOLUME
- Building images
- Best practices
- Multi-stage builds
- .dockerignore file
- Optimizing image size

### 3. [Docker Compose](./03-Docker-Compose/README.md)

- Docker Compose là gì?
- docker-compose.yml syntax
- Services
- Networks
- Volumes
- Environment variables
- Docker Compose commands:
  - `docker-compose up`
  - `docker-compose down`
  - `docker-compose ps`
  - `docker-compose logs`
  - `docker-compose build`
  - `docker-compose restart`
- Multi-container applications
- Database containers
- Networking between containers
- Volume mounting
- Deploying Spring Boot app với Docker Compose
- Full stack application (Frontend + Backend + Database)

#### Ví dụ thực hành:

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/mydb
  db:
    image: mysql:8.0
    environment:
      - MYSQL_DATABASE=mydb
      - MYSQL_ROOT_PASSWORD=root
    volumes:
      - db-data:/var/lib/mysql
volumes:
  db-data:
```

### 4. [Docker Swarm](./04-Docker-Swarm/README.md)

- Docker Swarm là gì?
- Orchestration concepts
- Swarm vs Kubernetes
- Swarm architecture:
  - Manager nodes
  - Worker nodes
  - Raft consensus
- Initialize swarm:
  - `docker swarm init`
  - `docker swarm join`
- Services:
  - `docker service create`
  - `docker service ls`
  - `docker service scale`
  - `docker service update`
  - `docker service rm`
- Stack deployment:
  - `docker stack deploy`
  - `docker stack ls`
  - `docker stack services`
  - `docker stack rm`
- Networking in Swarm:
  - Overlay networks
  - Ingress network
- Scaling services
- Load balancing
- Rolling updates
- Health checks
- Secrets management
- Config management

#### Ví dụ Stack file:

```yaml
version: "3.8"
services:
  web:
    image: myapp:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
    ports:
      - "80:8080"
    networks:
      - webnet
networks:
  webnet:
```

### 5. [Best Practices và Production](./05-Production-Best-Practices/README.md)

- Security best practices
- Image tagging strategies
- Logging và monitoring
- Resource limits
- Health checks
- Backup và recovery
- CI/CD integration
- Docker Registry
- Container orchestration comparison
- Migration strategies

## Bài tập thực hành

### Bài 1: Containerize Java Application

- Tạo Dockerfile cho ứng dụng Spring Boot
- Build và run container
- Push to Docker Hub

### Bài 2: Multi-container Application

- Tạo docker-compose.yml cho Spring Boot + MySQL
- Kết nối database
- Volume persistence
- Network configuration

### Bài 3: Deploy với Docker Swarm

- Setup Swarm cluster
- Deploy stack
- Scale services
- Rolling update
- Monitor services

## Dự án cuối khóa

Deploy ứng dụng Spring Boot hoàn chỉnh với:

- Multi-container setup (App + Database + Cache)
- Docker Compose cho development
- Docker Swarm cho production
- Load balancing
- Auto-scaling
- Health monitoring
- Logging
- Backup strategy

## Tài liệu tham khảo

- [Docker Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Swarm Documentation](https://docs.docker.com/engine/swarm/)
