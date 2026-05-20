package cl.sys.bff.bfffsanys.model;

import lombok.Data;

@Data
public class ReporteItemDTO {
    private Long id;
    private String tipoReporte;
    private String tipoMascota;
    private String nombreMascota;
    private String color;
    private String tamano;
    private String raza;
    private String fotoMascota;
    private String descripcion;
    private String direccion;
    private String coordenadas;
    private String sexo;
}
