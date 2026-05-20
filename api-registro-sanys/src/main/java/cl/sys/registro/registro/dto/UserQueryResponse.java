package cl.sys.registro.registro.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserQueryResponse {
    private int status;
    private UserProfileResponse user;
    private String message;
    private String error;
}
