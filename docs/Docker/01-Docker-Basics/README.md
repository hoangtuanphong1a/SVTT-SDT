# Docker Cơ bản

## Mục tiêu học tập

- Hiểu Docker và containerization
- Phân biệt Container vs Virtual Machine
- Nắm vững kiến trúc Docker
- Sử dụng thành thạo Docker commands
- Làm việc với images và containers

## 1. Docker là gì?

Docker là nền tảng containerization cho phép:

- Package ứng dụng và dependencies vào container
- Chạy ứng dụng ở bất kỳ môi trường nào
- Cô lập ứng dụng
- Tăng hiệu quả sử dụng tài nguyên

### Lợi ích:

✓ Consistency: Chạy giống nhau mọi nơi
✓ Isolation: Tách biệt ứng dụng
✓ Portability: Dễ dàng di chuyển
✓ Efficiency: Nhẹ hơn VM
✓ Scalability: Dễ dàng mở rộng

## 2. Container vs Virtual Machine

### Virtual Machine:

```
┌─────────────────────────────────────┐
│         Application                 │
├─────────────────────────────────────┤
│         Bins/Libraries              │
├─────────────────────────────────────┤
│         Guest OS                    │
├─────────────────────────────────────┤
│         Hypervisor                  │
├─────────────────────────────────────┤
│         Host OS                     │
├─────────────────────────────────────┤
│         Infrastructure              │
└─────────────────────────────────────┘
```

### Container:

```
┌─────────────────────────────────────┐
│         Application                 │
├─────────────────────────────────────┤
│         Bins/Libraries              │
├─────────────────────────────────────┤
│         Docker Engine               │
├─────────────────────────────────────┤
│         Host OS                     │
├─────────────────────────────────────┤
│         Infrastructure              │
└─────────────────────────────────────┘
```

| Aspect         | Virtual Machine | Container     |
| -------------- | --------------- | ------------- |
| Startup Time   | Minutes         | Seconds       |
| Size           | GBs             | MBs           |
| Resource Usage | High            | Low           |
| Isolation      | Complete        | Process-level |
| Portability    | Lower           | Higher        |

## 3. Docker Architecture

```
┌──────────────┐      ┌─────────────────────────┐
│ Docker Client│─────▶│   Docker Daemon         │
└──────────────┘      │  (dockerd)              │
                      │                         │
                      │  ┌──────────────────┐   │
                      │  │   Containers     │   │
                      │  └──────────────────┘   │
                      │  ┌──────────────────┐   │
                      │  │   Images         │   │
                      │  └──────────────────┘   │
                      │  ┌──────────────────┐   │
                      │  │   Volumes        │   │
                      │  └──────────────────┘   │
                      └─────────────────────────┘
                                ▲
                                │
                      ┌─────────▼──────────┐
                      │   Docker Hub       │
                      │  (Registry)        │
                      └────────────────────┘
```

### Components:

- **Docker Client**: CLI interface (docker commands)
- **Docker Daemon**: Background service quản lý containers
- **Docker Registry**: Lưu trữ images (Docker Hub)
- **Docker Objects**: Images, Containers, Networks, Volumes

## 4. Cài đặt Docker

### Windows:

1. Download Docker Desktop: https://www.docker.com/products/docker-desktop
2. Install và restart
3. Verify:

```cmd
docker --version
docker version
```

### Linux:

```bash
# Ubuntu
sudo apt-get update
sudo apt-get install docker.io
sudo systemctl start docker
sudo systemctl enable docker

# Verify
docker --version
sudo docker run hello-world
```

## 5. Docker Commands Cơ Bản

### Version và Info:

```bash
# Check version
docker --version
docker version

# System info
docker info

# Help
docker --help
docker run --help
```

### Working with Images:

```bash
# List images
docker images
docker image ls

# Pull image from Docker Hub
docker pull nginx
docker pull ubuntu:20.04
docker pull mysql:8.0

# Remove image
docker rmi nginx
docker rmi image_id

# Remove all unused images
docker image prune
```

### Working with Containers:

```bash
# Run container
docker run nginx
docker run -d nginx          # Detached mode (background)
docker run -d --name my-nginx nginx
docker run -d -p 8080:80 nginx      # Port mapping
docker run -it ubuntu bash   # Interactive mode

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop container
docker stop container_id
docker stop my-nginx

# Start container
docker start container_id

# Restart container
docker restart container_id

# Remove container
docker rm container_id
docker rm -f container_id    # Force remove running container

# Remove all stopped containers
docker container prune

# Execute command in running container
docker exec -it my-nginx bash

# View logs
docker logs container_id
docker logs -f container_id  # Follow logs

# View container details
docker inspect container_id

# View container stats
docker stats
docker stats container_id
```

## 6. Ví dụ thực hành

### Example 1: Nginx Web Server

```bash
# Pull nginx image
docker pull nginx

# Run nginx container
docker run -d --name my-web -p 8080:80 nginx

# Access: http://localhost:8080

# View logs
docker logs my-web

# Stop and remove
docker stop my-web
docker rm my-web
```

### Example 2: MySQL Database

```bash
# Run MySQL container
docker run -d \
  --name my-mysql \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -e MYSQL_DATABASE=testdb \
  -p 3306:3306 \
  mysql:8.0

# Connect to MySQL
docker exec -it my-mysql mysql -u root -p

# Or from host (if MySQL client installed)
mysql -h localhost -P 3306 -u root -p
```

### Example 3: Ubuntu Container

```bash
# Run Ubuntu container interactively
docker run -it ubuntu bash

# Inside container:
apt-get update
apt-get install curl
curl google.com
exit

# Container stops after exit
```

## 7. Container Lifecycle

```
┌─────────┐
│ Created │
└────┬────┘
     │
     ▼
┌─────────┐     ┌─────────┐
│ Running │────▶│ Paused  │
└────┬────┘     └────┬────┘
     │               │
     ▼               ▼
┌─────────┐     ┌─────────┐
│ Stopped │────▶│ Deleted │
└─────────┘     └─────────┘
```

### Commands:

```bash
docker create    # Create container
docker start     # Start container
docker run       # Create + Start
docker pause     # Pause container
docker unpause   # Resume container
docker stop      # Stop container
docker kill      # Force stop
docker rm        # Remove container
```

## 8. Docker Hub

Docker Hub là public registry chứa images.

```bash
# Search images
docker search ubuntu
docker search nginx

# Pull official images
docker pull ubuntu
docker pull node:18
docker pull python:3.11

# Pull from specific registry
docker pull myregistry.com/myimage:tag
```

## Bài tập

### Bài 1: Basic Operations

```bash
# 1. Pull ubuntu image
# 2. Run container với tên "my-ubuntu"
# 3. List running containers
# 4. Stop container
# 5. List all containers
# 6. Remove container
```

### Bài 2: Web Server

```bash
# 1. Run nginx container
# 2. Map port 9000:80
# 3. Access từ browser
# 4. View logs
# 5. Execute bash trong container
# 6. Navigate to /usr/share/nginx/html
```

### Bài 3: Multiple Containers

```bash
# Run 3 nginx containers:
# - nginx1: port 8081
# - nginx2: port 8082
# - nginx3: port 8083
# Verify tất cả đang chạy
```

### Bài 4: Container Management

```bash
# 1. Run container
# 2. Stop container
# 3. Start lại container
# 4. View container stats
# 5. Inspect container
# 6. View logs
```

### Bài 5: Cleanup

```bash
# 1. Stop all containers
# 2. Remove all containers
# 3. Remove all images
# 4. Verify: docker ps -a
# 5. Verify: docker images
```

## Câu hỏi ôn tập

1. Container khác VM như thế nào?
2. Docker architecture gồm những component nào?
3. Sự khác biệt giữa `docker run` và `docker start`?
4. `-d` flag trong `docker run -d` có ý nghĩa gì?
5. Làm thế nào để map port?
6. Docker Hub là gì?
7. Làm thế nào để xem logs của container?
8. Container lifecycle gồm những trạng thái nào?
