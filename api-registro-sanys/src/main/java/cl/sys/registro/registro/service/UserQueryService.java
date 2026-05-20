package cl.sys.registro.registro.service;

import cl.sys.registro.registro.dto.UserProfileResponse;
import cl.sys.registro.registro.model.Clinica;
import cl.sys.registro.registro.model.Persona;
import cl.sys.registro.registro.model.Profile;
import cl.sys.registro.registro.model.Refugio;
import cl.sys.registro.registro.repository.ClinicaRepository;
import cl.sys.registro.registro.repository.PersonaRepository;
import cl.sys.registro.registro.repository.RefugioRepository;
import cl.sys.registro.registro.repository.RegisterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserQueryService {

    private final RegisterRepository registerRepository;
    private final PersonaRepository personaRepository;
    private final ClinicaRepository clinicaRepository;
    private final RefugioRepository refugioRepository;

    public UserProfileResponse getById(UUID id) {
        Profile profile = registerRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Usuario no encontrado con id: " + id));

        UserProfileResponse.UserProfileResponseBuilder builder = UserProfileResponse.builder()
                .id(profile.getId())
                .role(profile.getRole())
                .userType(profile.getUserType())
                .phone(profile.getPhone());

        switch (profile.getUserType().toLowerCase()) {
            case "persona" -> {
                Persona persona = personaRepository.findById(id)
                        .orElseThrow(() -> new NoSuchElementException("Datos de persona no encontrados para id: " + id));
                builder.name(persona.getName()).lastName(persona.getLastName());
            }
            case "clinica" -> {
                Clinica clinica = clinicaRepository.findById(id)
                        .orElseThrow(() -> new NoSuchElementException("Datos de clínica no encontrados para id: " + id));
                builder.clinicaName(clinica.getClinicaName()).address(clinica.getAddress());
            }
            case "refugio" -> {
                Refugio refugio = refugioRepository.findById(id)
                        .orElseThrow(() -> new NoSuchElementException("Datos de refugio no encontrados para id: " + id));
                builder.refugioName(refugio.getRefugioName()).adress(refugio.getAdress());
            }
        }

        return builder.build();
    }
}
