# Build stage
FROM maven:3.8.6-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/auth-service-*.jar app.jar

# Environment variables
ENV SPRING_PROFILES_ACTIVE=docker
ENV TZ=Asia/Ho_Chi_Minh

# Expose port
EXPOSE 8081

# Entry point
ENTRYPOINT ["java", "-jar", "app.jar"]
