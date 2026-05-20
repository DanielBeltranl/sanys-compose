# Etapa 1: Construcción (Maven + Java 17 basado en tu pom.xml)
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar el pom.xml y descargar las dependencias para aprovechar la caché de Docker
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el código fuente y compilar el archivo JAR omitiendo los tests
COPY src ./src
RUN mvn package -DskipTests

# Etapa 2: Imagen de ejecución liviana
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copiar el JAR generado desde la etapa anterior
COPY --from=build /app/target/discovery-service-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto nativo de Eureka
EXPOSE 8761

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]