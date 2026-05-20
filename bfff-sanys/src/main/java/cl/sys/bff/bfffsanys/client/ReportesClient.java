package cl.sys.bff.bfffsanys.client;

import cl.sys.bff.bfffsanys.config.ReportesFeignConfig;
import cl.sys.bff.bfffsanys.model.ReporteItemDTO;
import cl.sys.bff.bfffsanys.model.ReporteRequestDTO;
import cl.sys.bff.bfffsanys.model.ReporteResponseDTO;
import cl.sys.bff.bfffsanys.model.ReportesNearbyRequestDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(
        name = "ms-reportes",
        url = "http://api-reporte:8086",
        configuration = ReportesFeignConfig.class
)
public interface ReportesClient {

    @PostMapping("/reportes/crear")
    ReporteResponseDTO crear(@RequestBody ReporteRequestDTO dto);

    @PostMapping("/reportes")
    List<ReporteItemDTO> obtenerCercanos(@RequestBody ReportesNearbyRequestDTO dto);

    @GetMapping("/reportes/{id}")
    ReporteItemDTO obtenerPorId(@PathVariable("id") Long id);
}
