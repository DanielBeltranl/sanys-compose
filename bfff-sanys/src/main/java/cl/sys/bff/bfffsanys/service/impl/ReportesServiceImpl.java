package cl.sys.bff.bfffsanys.service.impl;

import cl.sys.bff.bfffsanys.client.ReportesClient;
import cl.sys.bff.bfffsanys.model.ReporteItemDTO;
import cl.sys.bff.bfffsanys.model.ReporteRequestDTO;
import cl.sys.bff.bfffsanys.model.ReporteResponseDTO;
import cl.sys.bff.bfffsanys.model.ReportesNearbyRequestDTO;
import cl.sys.bff.bfffsanys.service.ReportesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportesServiceImpl implements ReportesService {

    private final ReportesClient reportesClient;

    @Override
    public ReporteResponseDTO crear(ReporteRequestDTO dto) {
        return reportesClient.crear(dto);
    }

    @Override
    public List<ReporteItemDTO> obtenerCercanos(ReportesNearbyRequestDTO dto) {
        return reportesClient.obtenerCercanos(dto);
    }

    @Override
    public ReporteItemDTO obtenerPorId(Long id) {
        return reportesClient.obtenerPorId(id);
    }
}
