package cl.sanosysalvos.reporte.messaging;

import cl.sanosysalvos.reporte.dto.ReporteResponseDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class ReportePublisher {

    private final RabbitTemplate rabbitTemplate;
    public static final String QUEUE_NAME = "reporte.creado.queue";

    public ReportePublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publicarNuevoReporte(ReporteResponseDTO reporte) {
        rabbitTemplate.convertAndSend(QUEUE_NAME, reporte);
        System.out.println(">>> [RabbitMQ] Reporte enviado a la cola: " + reporte.getId());
    }
}