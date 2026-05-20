package cl.sys.bff.bfffsanys.service.impl;

import cl.sys.bff.bfffsanys.client.RegistroClient;
import cl.sys.bff.bfffsanys.model.RegisterRequestDTO;
import cl.sys.bff.bfffsanys.model.RegisterResponseDTO;
import cl.sys.bff.bfffsanys.model.UsuarioResponseDTO;
import cl.sys.bff.bfffsanys.service.RegistroService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistroServiceImpl implements RegistroService {

    private final RegistroClient registroClient;

    @Override
    public RegisterResponseDTO registrar(RegisterRequestDTO dto) {
        return registroClient.registrar(dto);
    }

    @Override
    public UsuarioResponseDTO getUsuario(String id, String authorization) {
        return registroClient.getUsuario(id, authorization);
    }
}
