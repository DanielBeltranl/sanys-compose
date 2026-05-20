package com.sanosysalvos.notification.service;

import com.sanosysalvos.notification.dto.CoincidenciaEventDTO;
import com.sanosysalvos.notification.dto.NotificacionResumenDTO;
import com.sanosysalvos.notification.model.Notificacion;
import com.sanosysalvos.notification.repository.NotificacionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationService {

    private final NotificacionRepository repository;
    private final WebSocketNotificationService webSocketService;

    @RabbitListener(queues = "${app.rabbitmq.queue}")
    public void escucharNotificacionesDesdeRabbitMQ(CoincidenciaEventDTO evento) {
        log.info("Evento recibido de RabbitMQ: {}", evento);
        procesarNotificacion(evento);
    }

    @Recover
    public void recuperar(Exception e, CoincidenciaEventDTO evento) {
        log.error("Fallo tras 3 intentos: {}", e.getMessage());
        Notificacion errorLog = new Notificacion();
        errorLog.setId_coincidencia(evento.getId_coincidencia());
        errorLog.setId_reporte_perdida(evento.getId_reporte_perdida());
        errorLog.setId_reporte_encontrado(evento.getId_reporte_encontrado());
        errorLog.setId_usuario_reporte_perdida(evento.getId_usuario_reporte_perdida());
        errorLog.setNombre_mascota(evento.getNombre_mascota());
        errorLog.setTipo_mascota(evento.getTipo_mascota());
        errorLog.setDireccion(evento.getDireccion());
        errorLog.setCoordenadas(evento.getCoordenadas());
        errorLog.setFecha_coincidencia(evento.getFecha_coincidencia());
        errorLog.setEmail_usuario(evento.getEmail_usuario());
        errorLog.setEstado_notificacion("FALLIDA");
        errorLog.setMensajeError(e.getMessage());
        repository.save(errorLog);
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3, backoff = @Backoff(delay = 2000))
    public void procesarNotificacion(CoincidenciaEventDTO evento) {
        log.info("Procesando coincidencia ID: {}", evento.getId_coincidencia());

        Notificacion n = new Notificacion();
        n.setId_coincidencia(evento.getId_coincidencia());
        n.setId_reporte_perdida(evento.getId_reporte_perdida());
        n.setId_reporte_encontrado(evento.getId_reporte_encontrado());
        n.setId_usuario_reporte_perdida(evento.getId_usuario_reporte_perdida());
        n.setNombre_mascota(evento.getNombre_mascota());
        n.setTipo_mascota(evento.getTipo_mascota());
        n.setDireccion(evento.getDireccion());
        n.setCoordenadas(evento.getCoordenadas());
        n.setFecha_coincidencia(evento.getFecha_coincidencia());
        n.setEmail_usuario(evento.getEmail_usuario());
        n.setDescripcion("¡Match! Se ha registrado un avistamiento que podría ser tu mascota " + evento.getNombre_mascota() + "!");
        n.setEstado_notificacion("PENDIENTE");

        Notificacion guardada = repository.save(n);
        log.info("Notificación guardada con estado PENDIENTE para usuario {}", evento.getId_usuario_reporte_perdida());

        boolean enviado = webSocketService.notificarUsuario(evento.getId_usuario_reporte_perdida(), guardada);
        if (enviado) {
            guardada.setEstado_notificacion("ENVIADA");
            repository.save(guardada);
            log.info("Notificación actualizada a ENVIADA para usuario {}", evento.getId_usuario_reporte_perdida());
        }
    }

    public List<NotificacionResumenDTO> obtenerPorUsuario(String idUsuario) {
        return repository.findPendientesOFallidasPorUsuario(idUsuario)
                .stream()
                .map(n -> new NotificacionResumenDTO(
                        n.getNombre_mascota(),
                        n.getId_reporte_encontrado(),
                        n.getFecha_coincidencia()
                ))
                .toList();
    }

    public List<Notificacion> obtenerTodas() {
        return repository.findAll();
    }

    public NotificacionResumenDTO obtenerPorId(Long id) {
        Notificacion notificacion = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notificación no encontrada"));

        if (!notificacion.getEstado_notificacion().equals("PENDIENTE") &&
            !notificacion.getEstado_notificacion().equals("FALLIDA")) {
            throw new RuntimeException("Notificación no encontrada");
        }

        return new NotificacionResumenDTO(
                notificacion.getNombre_mascota(),
                notificacion.getId_reporte_encontrado(),
                notificacion.getFecha_coincidencia()
        );
    }
}
