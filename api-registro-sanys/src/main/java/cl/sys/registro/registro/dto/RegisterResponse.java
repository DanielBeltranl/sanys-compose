package cl.sys.registro.registro.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterResponse {
    private int status;
    private String token;
    private String message;
    private String error;
}
