package com.sanosysalvos.notification.service;

import com.sanosysalvos.notification.config.WebSocketSessionRegistry;
import com.sanosysalvos.notification.model.Notificacion;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class WebSocketNotificationService {

    private final SimpMessagingTemplate messagingTemplate;
    private final WebSocketSessionRegistry sessionRegistry;

    public boolean notificarUsuario(String idUsuario, Notificacion notificacion) {
        if (!sessionRegistry.isUserConnected(idUsuario)) {
            log.info("Usuario {} no está conectado, notificación queda como PENDIENTE", idUsuario);
            return false;
        }

        try {
            Map<String, Object> mensaje = new HashMap<>();
            mensaje.put("nombre_mascota", notificacion.getNombre_mascota());
            mensaje.put("id_reporte_encontrado", notificacion.getId_reporte_encontrado());
            mensaje.put("fecha_coincidencia", notificacion.getFecha_coincidencia());

            String destino = "/topic/notifications/" + idUsuario;
            messagingTemplate.convertAndSend(destino, mensaje);

            log.info("Notificación enviada a usuario {} vía WebSocket", idUsuario);
            return true;
        } catch (Exception e) {
            log.error("Error al enviar notificación vía WebSocket al usuario {}: {}", idUsuario, e.getMessage());
            return false;
        }
    }
}
