package cl.sys.bff.bfffsanys.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class NotificacionResponseDTO {

    @JsonProperty("nombre_mascota")
    private String nombreMascota;

    @JsonProperty("id_reporte_encontrado")
    private Long idReporteEncontrado;

    @JsonProperty("fecha_coincidencia")
    private String fechaCoincidencia;
}
