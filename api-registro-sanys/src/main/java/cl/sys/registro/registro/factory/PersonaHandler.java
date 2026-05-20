package cl.sys.registro.registro.factory;

import cl.sys.registro.registro.dto.RegisterRequest;
import cl.sys.registro.registro.model.Persona;
import cl.sys.registro.registro.repository.PersonaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class PersonaHandler implements RegistrationHandler {

    private final PersonaRepository personaRepository;

    @Override
    public void handle(RegisterRequest request, UUID userId) {
        Persona persona = new Persona();
        persona.setId(userId);
        persona.setName(request.getName());
        persona.setLastName(request.getLastName());
        personaRepository.save(persona);
    }

    @Override
    public String getUserType() {
        return "persona";
    }
}
