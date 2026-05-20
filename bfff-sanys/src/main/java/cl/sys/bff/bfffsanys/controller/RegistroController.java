package cl.sys.bff.bfffsanys.controller;

import cl.sys.bff.bfffsanys.model.RegisterRequestDTO;
import cl.sys.bff.bfffsanys.model.RegisterResponseDTO;
import cl.sys.bff.bfffsanys.model.UsuarioResponseDTO;
import cl.sys.bff.bfffsanys.service.RegistroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/registro")
@RequiredArgsConstructor
public class RegistroController {

    private final RegistroService registroService;

    @PostMapping
    public ResponseEntity<RegisterResponseDTO> registrar(@RequestBody RegisterRequestDTO request) {
        RegisterResponseDTO response = registroService.registrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> getUsuario(
            @PathVariable String id,
            @RequestHeader("Authorization") String authorization) {
        UsuarioResponseDTO response = registroService.getUsuario(id, authorization);
        return ResponseEntity.ok(response);
    }
}
