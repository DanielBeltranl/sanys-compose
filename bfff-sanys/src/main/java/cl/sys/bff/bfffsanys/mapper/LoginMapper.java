package cl.sys.bff.bfffsanys.mapper;

import cl.sys.bff.bfffsanys.model.LoginResponseDTO;
import cl.sys.bff.bfffsanys.model.SupabaseLoginResponseDTO;
import org.springframework.stereotype.Component;

@Component
public class LoginMapper {

    public LoginResponseDTO toLoginResponse(SupabaseLoginResponseDTO supabaseResponse) {
        LoginResponseDTO response = new LoginResponseDTO();
        response.setStatus(200);
        response.setAccessToken(supabaseResponse.getAccessToken());
        response.setExpiresIn(supabaseResponse.getExpiresIn());
        response.setRefreshToken(supabaseResponse.getRefreshToken());
        response.setUser(supabaseResponse.getUser().getUserMetadata());
        return response;
    }
}
