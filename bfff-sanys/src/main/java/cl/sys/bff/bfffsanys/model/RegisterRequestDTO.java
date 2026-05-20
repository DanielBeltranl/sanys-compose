package cl.sys.bff.bfffsanys.model;

import lombok.Data;

@Data
public class RegisterRequestDTO {

    // Campos comunes a todos los tipos
    private String email;
    private String password;
    private Long phone;
    private String userType;

    // PERSONA
    private String name;
    private String lastName;

    // CLINICA
    private String clinicaName;
    private String address;

    // REFUGIO
    private String refugioName;
    private String adress; // nombre de campo tal como lo define el microservicio
}
