package cl.sys.bff.bfffsanys.model;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private Integer status;
    private String accessToken;
    private Integer expiresIn;
    private String refreshToken;
    private SupabaseLoginResponseDTO.UserMetadataDTO user;
}
