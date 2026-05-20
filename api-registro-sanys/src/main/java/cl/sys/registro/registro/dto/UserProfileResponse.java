package cl.sys.registro.registro.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserProfileResponse {

    // Profile
    private UUID id;
    private String role;
    private String userType;
    private Long phone;

    // Persona
    private String name;
    private String lastName;

    // Clinica
    private String clinicaName;
    private String address;

    // Refugio
    private String refugioName;
    private String adress;
}
