package com.sanosysalvos.notification.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    // Lee el nombre de la cola desde application.properties
    @Value("${app.rabbitmq.queue}")
    private String queueName;

    @Bean
    public Queue queue() {
        // durable: true para que la cola no se borre si RabbitMQ se reinicia
        return new Queue(queueName, true);
    }

    @Bean
    public Jackson2JsonMessageConverter jsonMessageConverter() {
        // Esto permite que el microservicio reciba JSON y lo convierta a DTO automáticamente
        return new Jackson2JsonMessageConverter();
    }
}