package cl.sys.bff.bfffsanys.service.impl;

import cl.sys.bff.bfffsanys.client.LoginClient;
import cl.sys.bff.bfffsanys.mapper.LoginMapper;
import cl.sys.bff.bfffsanys.model.LoginRequestDTO;
import cl.sys.bff.bfffsanys.model.LoginResponseDTO;
import cl.sys.bff.bfffsanys.model.SupabaseLoginResponseDTO;
import cl.sys.bff.bfffsanys.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final LoginClient loginClient;
    private final LoginMapper loginMapper;

    @Value("${supabase.anon-key}")
    private String supabaseAnonKey;

    @Override
    public LoginResponseDTO login(LoginRequestDTO dto) {
        SupabaseLoginResponseDTO supabaseResponse = loginClient.login(supabaseAnonKey, dto);
        return loginMapper.toLoginResponse(supabaseResponse);
    }
}
