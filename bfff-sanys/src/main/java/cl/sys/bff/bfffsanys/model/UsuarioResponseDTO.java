package cl.sys.bff.bfffsanys.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.ALWAYS)
public class UsuarioResponseDTO {

    private Integer status;
    private String message;
    private String error;
    private UserDTO user;
}
