package cl.sys.registro.registro.factory;

import cl.sys.registro.registro.dto.RegisterRequest;

import java.util.UUID;

public interface RegistrationHandler {
    void handle(RegisterRequest request, UUID userId);
    String getUserType();
}