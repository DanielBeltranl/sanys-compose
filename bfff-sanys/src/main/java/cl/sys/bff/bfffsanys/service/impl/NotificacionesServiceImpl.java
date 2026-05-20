package cl.sys.bff.bfffsanys.service.impl;

import cl.sys.bff.bfffsanys.client.NotificacionesClient;
import cl.sys.bff.bfffsanys.model.NotificacionResponseDTO;
import cl.sys.bff.bfffsanys.service.NotificacionesService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificacionesServiceImpl implements NotificacionesService {

    private final NotificacionesClient notificacionesClient;

    @Override
    public NotificacionResponseDTO obtenerPorId(Long id) {
        return notificacionesClient.obtenerPorId(id);
    }

    @Override
    public List<NotificacionResponseDTO> obtenerPorUsuario(String idUsuario) {
        return notificacionesClient.obtenerPorUsuario(idUsuario);
    }
}
