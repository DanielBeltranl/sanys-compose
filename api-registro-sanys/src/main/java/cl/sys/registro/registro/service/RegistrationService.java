package cl.sys.registro.registro.service;

import cl.sys.registro.registro.dto.RegisterRequest;
import cl.sys.registro.registro.dto.RegisterResponse;
import cl.sys.registro.registro.dto.SupabaseAuthResult;
import cl.sys.registro.registro.factory.RegistrationHandlerFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final SupabaseAuthService supabaseAuthService;
    private final RegistrationHandlerFactory factory;
    private final PlatformTransactionManager transactionManager;

    public RegisterResponse register(RegisterRequest request) {
        String role = request.getUserType().equalsIgnoreCase("persona") ? "PERSONA" : "INSTITUCION";
        SupabaseAuthResult authResult = supabaseAuthService.signUp(request, role);

        try {
            new TransactionTemplate(transactionManager).executeWithoutResult(
                    status -> factory.getHandler(request.getUserType()).handle(request, authResult.userId())
            );
        } catch (Exception e) {
            supabaseAuthService.deleteUser(authResult.userId());
            throw new RuntimeException("Error al registrar el usuario", e);
        }

        return RegisterResponse.builder()
                .status(201)
                .token(authResult.token())
                .message("Usuario registrado exitosamente")
                .build();
    }
}
