package cl.sys.bff.bfffsanys.exception;

import feign.RetryableException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MicroservicioException.class)
    public ResponseEntity<Object> handleMicroservicioException(MicroservicioException ex) {
        return ResponseEntity.status(ex.getStatus()).body(ex.getBody());
    }

    @ExceptionHandler(RetryableException.class)
    public ResponseEntity<Object> handleConexionException(RetryableException ex) {
        return ResponseEntity.status(503).body(Map.of(
                "error", "Servicio no disponible",
                "message", "No se pudo conectar con el servicio destino",
                "status", 503,
                "token", null
        ));
    }
}
