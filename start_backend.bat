@echo off
echo "Starting backend service..."
echo "Current directory: %CD%"

REM Check if we are in the right directory
if not exist pom.xml (
    echo "pom.xml not found. Changing to backend directory..."
    cd backend
    echo "New directory: %CD%"
)

if exist pom.xml (
    echo "Found pom.xml, starting backend..."
    echo "Compiling backend..."
    mvn clean compile -q
    if %ERRORLEVEL% EQU 0 (
        echo "Compilation successful"
        echo "Starting Spring Boot application..."
        mvn spring-boot:run
    ) else (
        echo "Compilation failed"
        echo "Please check the Maven configuration"
        pause
    )
) else (
    echo "pom.xml still not found. Please run this script from the project root directory."
    pause
)