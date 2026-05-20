package cl.sys.bff.bfffsanys.service;

import cl.sys.bff.bfffsanys.model.ReporteItemDTO;
import cl.sys.bff.bfffsanys.model.ReporteRequestDTO;
import cl.sys.bff.bfffsanys.model.ReporteResponseDTO;
import cl.sys.bff.bfffsanys.model.ReportesNearbyRequestDTO;

import java.util.List;

public interface ReportesService {
    ReporteResponseDTO crear(ReporteRequestDTO dto);
    List<ReporteItemDTO> obtenerCercanos(ReportesNearbyRequestDTO dto);
    ReporteItemDTO obtenerPorId(Long id);
}
