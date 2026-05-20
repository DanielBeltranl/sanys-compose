package cl.sys.registro.registro.controller;

import cl.sys.registro.registro.dto.RegisterRequest;
import cl.sys.registro.registro.dto.RegisterResponse;
import cl.sys.registro.registro.dto.UserProfileResponse;
import cl.sys.registro.registro.dto.UserQueryResponse;
import cl.sys.registro.registro.service.RegistrationService;
import cl.sys.registro.registro.service.UserQueryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/registro")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;
    private final UserQueryService userQueryService;

    @PostMapping
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            RegisterResponse response = registrationService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            RegisterResponse error = RegisterResponse.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("Error al registrar el usuario")
                    .error(e.getMessage())
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserQueryResponse> getUser(@PathVariable UUID id) {
        try {
            UserProfileResponse user = userQueryService.getById(id);
            UserQueryResponse response = UserQueryResponse.builder()
                    .status(HttpStatus.OK.value())
                    .user(user)
                    .message("Usuario encontrado exitosamente")
                    .build();
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            UserQueryResponse response = UserQueryResponse.builder()
                    .status(HttpStatus.NOT_FOUND.value())
                    .message("Usuario no encontrado")
                    .error(e.getMessage())
                    .build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RegisterResponse> handleValidationErrors(MethodArgumentNotValidException ex) {
        String errors = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
                .collect(Collectors.joining(", "));

        RegisterResponse response = RegisterResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message("Datos de registro inválidos")
                .error(errors)
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
