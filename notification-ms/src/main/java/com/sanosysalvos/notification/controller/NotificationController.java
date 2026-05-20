package com.sanosysalvos.notification.controller;

import com.sanosysalvos.notification.dto.CoincidenciaEventDTO;
import com.sanosysalvos.notification.dto.NotificacionResumenDTO;
import com.sanosysalvos.notification.model.Notificacion;
import com.sanosysalvos.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService service;

    @PostMapping("/match")
    public String enviar(@RequestBody CoincidenciaEventDTO evento) {
        service.procesarNotificacion(evento);
        return "Evento recibido correctamente";
    }

    @GetMapping
    public List<Notificacion> obtenerTodas() {
        return service.obtenerTodas();
    }

    @GetMapping("/{id}")
    public NotificacionResumenDTO obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<NotificacionResumenDTO> obtenerPorUsuario(@PathVariable String idUsuario) {
        return service.obtenerPorUsuario(idUsuario);
    }
}