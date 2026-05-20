package cl.sys.bff.bfffsanys.service;

import cl.sys.bff.bfffsanys.model.RegisterRequestDTO;
import cl.sys.bff.bfffsanys.model.RegisterResponseDTO;
import cl.sys.bff.bfffsanys.model.UsuarioResponseDTO;

public interface RegistroService {

    RegisterResponseDTO registrar(RegisterRequestDTO dto);

    UsuarioResponseDTO getUsuario(String id, String authorization);
}
