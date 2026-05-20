package com.sanosysalvos.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NotificacionResumenDTO {
    private String nombre_mascota;
    private Long id_reporte_encontrado;
    private String fecha_coincidencia;
}
