package cl.sys.bff.bfffsanys.model;

import lombok.Data;

@Data
public class RegisterResponseDTO {
    private String error;
    private String message;
    private Integer status;
    private String token;
}
