package cl.sys.bff.bfffsanys.controller;

import cl.sys.bff.bfffsanys.model.ReporteItemDTO;
import cl.sys.bff.bfffsanys.model.ReporteRequestDTO;
import cl.sys.bff.bfffsanys.model.ReporteResponseDTO;
import cl.sys.bff.bfffsanys.model.ReportesNearbyRequestDTO;
import cl.sys.bff.bfffsanys.service.ReportesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/reportes")
@RequiredArgsConstructor
public class ReportesController {

    private final ReportesService reportesService;

    @PostMapping("/crear")
    public ResponseEntity<ReporteResponseDTO> crear(@RequestBody ReporteRequestDTO request) {
        ReporteResponseDTO response = reportesService.crear(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping
    public ResponseEntity<List<ReporteItemDTO>> obtenerCercanos(@RequestBody ReportesNearbyRequestDTO request) {
        List<ReporteItemDTO> reportes = reportesService.obtenerCercanos(request);
        return ResponseEntity.ok(reportes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReporteItemDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(reportesService.obtenerPorId(id));
    }
}
