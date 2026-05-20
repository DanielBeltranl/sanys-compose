package com.sanosysalvos.notification.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class WebSocketSessionRegistry {

    // sessionId → id_usuario_reporte_perdida (UUID)
    private final Map<String, String> sessionToUser = new ConcurrentHashMap<>();

    @EventListener
    public void onSubscribe(SessionSubscribeEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String destination = accessor.getDestination();
        String sessionId = accessor.getSessionId();

        if (destination != null && destination.startsWith("/topic/notifications/")) {
            String userId = destination.replace("/topic/notifications/", "");
            sessionToUser.put(sessionId, userId);
            log.info("Usuario {} suscrito al canal de notificaciones (session {})", userId, sessionId);
        }
    }

    @EventListener
    public void onDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        String userId = sessionToUser.remove(sessionId);
        if (userId != null) {
            log.info("Usuario {} desconectado del canal de notificaciones (session {})", userId, sessionId);
        }
    }

    public boolean isUserConnected(String userId) {
        return sessionToUser.containsValue(userId);
    }
}
