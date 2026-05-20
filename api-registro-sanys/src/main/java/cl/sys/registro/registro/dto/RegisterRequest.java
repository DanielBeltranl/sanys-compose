package cl.sys.registro.registro.dto;

import cl.sys.registro.registro.validation.ValidRegistration;
import lombok.Data;

@Data
@ValidRegistration
public class RegisterRequest {

    private String email;
    private String password;
    private Long phone;
    private String userType;

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
