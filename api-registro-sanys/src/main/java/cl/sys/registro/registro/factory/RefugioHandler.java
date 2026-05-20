package cl.sys.registro.registro.factory;

import cl.sys.registro.registro.dto.RegisterRequest;
import cl.sys.registro.registro.model.Refugio;
import cl.sys.registro.registro.repository.RefugioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class RefugioHandler implements RegistrationHandler {

    private final RefugioRepository refugioRepository;

    @Override
    public void handle(RegisterRequest request, UUID userId) {
        Refugio refugio = new Refugio();
        refugio.setId(userId);
        refugio.setRefugioName(request.getRefugioName());
        refugio.setAdress(request.getAdress());
        refugioRepository.save(refugio);
    }

    @Override
    public String getUserType() {
        return "refugio";
    }
}
