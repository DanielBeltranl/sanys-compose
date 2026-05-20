package cl.sys.registro.registro.factory;

import cl.sys.registro.registro.dto.RegisterRequest;
import cl.sys.registro.registro.model.Clinica;
import cl.sys.registro.registro.repository.ClinicaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ClinicaHandler implements RegistrationHandler {

    private final ClinicaRepository clinicaRepository;

    @Override
    public void handle(RegisterRequest request, UUID userId) {
        Clinica clinica = new Clinica();
        clinica.setId(userId);
        clinica.setClinicaName(request.getClinicaName());
        clinica.setAddress(request.getAddress());
        clinicaRepository.save(clinica);
    }

    @Override
    public String getUserType() {
        return "clinica";
    }
}
