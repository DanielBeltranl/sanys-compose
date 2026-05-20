package cl.sys.bff.bfffsanys.service;

import cl.sys.bff.bfffsanys.model.LoginRequestDTO;
import cl.sys.bff.bfffsanys.model.LoginResponseDTO;

public interface LoginService {

    LoginResponseDTO login(LoginRequestDTO dto);
}
