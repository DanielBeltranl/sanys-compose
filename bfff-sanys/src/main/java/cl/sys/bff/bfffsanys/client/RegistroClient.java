package cl.sys.bff.bfffsanys.client;

import cl.sys.bff.bfffsanys.model.RegisterRequestDTO;
import cl.sys.bff.bfffsanys.model.RegisterResponseDTO;
import cl.sys.bff.bfffsanys.model.UsuarioResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(
        name = "api-registro",
        url = "http://api-registro:8080"
)
public interface RegistroClient {

    @PostMapping("/api/registro")
    RegisterResponseDTO registrar(@RequestBody RegisterRequestDTO dto);

    @GetMapping("/api/registro/{id}")
    UsuarioResponseDTO getUsuario(@PathVariable("id") String id,
                                  @RequestHeader("Authorization") String authorization);
}
