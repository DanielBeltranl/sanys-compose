package cl.sys.bff.bfffsanys.service;

import cl.sys.bff.bfffsanys.model.NotificacionResponseDTO;
import java.util.List;

public interface NotificacionesService {
    NotificacionResponseDTO obtenerPorId(Long id);
    List<NotificacionResponseDTO> obtenerPorUsuario(String idUsuario);
}
