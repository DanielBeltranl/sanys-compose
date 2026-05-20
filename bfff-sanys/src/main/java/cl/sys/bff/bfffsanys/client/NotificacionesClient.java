package cl.sys.bff.bfffsanys.client;

import cl.sys.bff.bfffsanys.config.GlobalFeignConfig;
import cl.sys.bff.bfffsanys.model.NotificacionResponseDTO;
import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "api-notificaciones",
        url = "http://api-notificaciones:8083",
        configuration = GlobalFeignConfig.class
)
public interface NotificacionesClient {

    @GetMapping("/api/notifications/{id}")
    NotificacionResponseDTO obtenerPorId(@PathVariable("id") Long id);

    @GetMapping("/api/notifications/usuario/{idUsuario}")
    List<NotificacionResponseDTO> obtenerPorUsuario(@PathVariable("idUsuario") String idUsuario);
}
