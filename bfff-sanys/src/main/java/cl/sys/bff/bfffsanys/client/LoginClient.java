package cl.sys.bff.bfffsanys.client;

import cl.sys.bff.bfffsanys.model.LoginRequestDTO;
import cl.sys.bff.bfffsanys.model.SupabaseLoginResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(
        name = "supabase-auth",
        url = "${ms.login.url}"
)
public interface LoginClient {

    @PostMapping("/auth/v1/token?grant_type=password")
    SupabaseLoginResponseDTO login(
            @RequestHeader("apikey") String apiKey,
            @RequestBody LoginRequestDTO request
    );
}
