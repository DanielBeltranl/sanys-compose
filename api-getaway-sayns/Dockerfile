
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B


COPY src ./src
RUN mvn package -DskipTests


FROM eclipse-temurin:21-jre-jammy
WORKDIR /app


COPY --from=build /app/target/api-gateaway-sys-2-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto del Gateway
EXPOSE 8081

# Ejecutar el Gateway
ENTRYPOINT ["java", "-jar", "app.jar"]