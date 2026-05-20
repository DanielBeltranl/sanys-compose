# Stage 1: Compilación de la aplicación
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar el pom.xml y descargar las dependencias para aprovechar la caché de Docker
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el código fuente y compilar el archivo JAR saltándose los tests
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Imagen de ejecución ligera
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copiar el JAR generado desde el stage de compilación
COPY --from=build /app/target/*.jar app.jar

# Exponer el puerto configurado en tu application.yml
EXPOSE 8083

# Comando para ejecutar la aplicación pasando el perfil por defecto
ENTRYPOINT ["java", "-jar", "app.jar"]