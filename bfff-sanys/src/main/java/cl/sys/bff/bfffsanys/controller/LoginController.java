package cl.sys.bff.bfffsanys.controller;

import cl.sys.bff.bfffsanys.model.LoginRequestDTO;
import cl.sys.bff.bfffsanys.model.LoginResponseDTO;
import cl.sys.bff.bfffsanys.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(loginService.login(request));
    }
}
