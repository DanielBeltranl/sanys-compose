package cl.sanosysalvos.reporte.controller;

import cl.sanosysalvos.reporte.dto.ApiResponseDTO;
import cl.sanosysalvos.reporte.dto.ReporteRequestDTO;
import cl.sanosysalvos.reporte.dto.ReporteResponseDTO;
import cl.sanosysalvos.reporte.dto.UbicacionRequestDTO;
import cl.sanosysalvos.reporte.service.ReporteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reportes")
public class  ReporteController {

    private final ReporteService reporteService;

    // Inyección de dependencias por constructor
    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    @PostMapping("/crear")
    public ResponseEntity<ApiResponseDTO> crear(@Valid @RequestBody ReporteRequestDTO dto) {
        reporteService.guardarReporte(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponseDTO(201, "Reporte creado exitosamente", null));
    }

    @PostMapping
    public ResponseEntity<List<ReporteResponseDTO>> listar(@RequestBody UbicacionRequestDTO ubicacion) {
        List<ReporteResponseDTO> lista = reporteService.obtenerTodos(ubicacion.getLatitud(), ubicacion.getLongitud());
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReporteResponseDTO> obtenerPorId(@PathVariable Long id) {
        ReporteResponseDTO reporte = reporteService.obtenerPorId(id);
        return ResponseEntity.ok(reporte);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReporteResponseDTO> actualizar(@PathVariable Long id, @Valid @RequestBody ReporteRequestDTO dto) {
        ReporteResponseDTO actualizado = reporteService.actualizarReporte(id, dto);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        reporteService.eliminarReporte(id);
        // Retornamos 204 No Content, indicando que se eliminó correctamente
        return ResponseEntity.noContent().build();
    }
}