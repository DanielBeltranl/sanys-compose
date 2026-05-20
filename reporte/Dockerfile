
# Etapa 1: Construcción (Maven + Java 21)
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copiar el pom.xml y pre-descargar dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar fuentes y compilar el JAR omitiendo los tests
COPY src ./src
RUN mvn package -DskipTests

# Etapa 2: Imagen de ejecución liviana con JRE 21
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copiar el JAR generado (usa el artefactId definido en tu pom: "reporte")
COPY --from=build /app/target/reporte-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto del microservicio de reportes
EXPOSE 8086

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]