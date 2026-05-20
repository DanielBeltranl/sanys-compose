package cl.sys.bff.bfffsanys.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SupabaseLoginResponseDTO {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("token_type")
    private String tokenType;

    @JsonProperty("expires_in")
    private Integer expiresIn;

    @JsonProperty("refresh_token")
    private String refreshToken;

    private UserDTO user;

    @Data
    public static class UserDTO {

        @JsonProperty("user_metadata")
        private UserMetadataDTO userMetadata;
    }

    @Data
    public static class UserMetadataDTO {
        private String email;
        private String role;
        private String phone;

        @JsonProperty("user_type")
        private String userType;
    }
}
