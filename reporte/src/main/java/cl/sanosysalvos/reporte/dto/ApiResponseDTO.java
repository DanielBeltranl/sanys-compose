package cl.sanosysalvos.reporte.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponseDTO {
    private int status;
    private String message;
    private String error;
}
