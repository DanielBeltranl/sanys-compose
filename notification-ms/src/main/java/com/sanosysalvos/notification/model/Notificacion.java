package com.sanosysalvos.notification.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "notificaciones")
@Data
public class Notificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_notificacion;
    private String estado_notificacion;
    private String descripcion;
    private Long id_coincidencia;
    private Long id_reporte_perdida;
    private Long id_reporte_encontrado;
    private String id_usuario_reporte_perdida;
    private LocalDateTime fecha_creacion = LocalDateTime.now();
    private String mensajeError;
    private String nombre_mascota;
    private String tipo_mascota;
    private String direccion;
    private String coordenadas;
    private String fecha_coincidencia;
    private String email_usuario;
}
