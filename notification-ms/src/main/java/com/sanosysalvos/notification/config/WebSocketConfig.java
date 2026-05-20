package com.sanosysalvos.notification.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Habilita un simple message broker en memoria
        // /topic - para broadcast a múltiples usuarios
        config.enableSimpleBroker("/topic", "/queue");
        
        // Prefijo para mensajes enviados por el cliente
        config.setApplicationDestinationPrefixes("/app");
    }

        @Override
        public void registerStompEndpoints(StompEndpointRegistry registry) {
            registry.addEndpoint("/ws-notifications")
                    .setAllowedOriginPatterns("*")
                    .withSockJS();
        }
}
