package cl.sanosysalvos.reporte.service;

import cl.sanosysalvos.reporte.dto.ReporteRequestDTO;
import cl.sanosysalvos.reporte.dto.ReporteResponseDTO;
import java.util.List;

public interface ReporteService {
    
    ReporteResponseDTO guardarReporte(ReporteRequestDTO dto);
    List<ReporteResponseDTO> obtenerTodos(double latitud, double longitud);
    ReporteResponseDTO obtenerPorId(Long id);
    ReporteResponseDTO actualizarReporte(Long id, ReporteRequestDTO dto);
    void eliminarReporte(Long id);
}