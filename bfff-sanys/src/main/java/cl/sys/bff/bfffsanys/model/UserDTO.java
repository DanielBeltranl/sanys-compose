package cl.sys.bff.bfffsanys.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.UUID;

@Data
@JsonInclude(JsonInclude.Include.ALWAYS)
public class UserDTO {

    private UUID id;
    private String role;
    private String userType;
    private Long phone;
    private String name;
    private String lastName;
    private String clinicaName;
    private String address;
    private String refugioName;
    private String adress;
}
