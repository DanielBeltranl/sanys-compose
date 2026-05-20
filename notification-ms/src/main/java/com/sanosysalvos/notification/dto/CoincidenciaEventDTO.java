package com.sanosysalvos.notification.dto;

import lombok.Data;

@Data
public class CoincidenciaEventDTO {
    private Long id_coincidencia;
    private Long id_reporte_perdida;
    private Long id_reporte_encontrado;
    private String fecha_coincidencia;
    private String nombre_mascota;
    private String tipo_mascota;
    private String direccion;
    private String coordenadas;
    private String id_usuario_reporte_perdida;
    private String email_usuario;
}
