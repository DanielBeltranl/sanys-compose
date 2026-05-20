package cl.sys.bff.bfffsanys.model;

import lombok.Data;

@Data
public class ReporteResponseDTO {
    private Integer status;
    private String message;
    private String error;
}
