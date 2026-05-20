package cl.sys.registro.registro.factory;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class RegistrationHandlerFactory {

    private final Map<String, RegistrationHandler> handlers;

    public RegistrationHandlerFactory(List<RegistrationHandler> handlerList) {
        handlers = handlerList.stream()
                .collect(Collectors.toMap(RegistrationHandler::getUserType, h -> h));
    }

    public RegistrationHandler getHandler(String userType) {
        RegistrationHandler handler = handlers.get(userType.toLowerCase());
        if (handler == null) {
            throw new IllegalArgumentException("Tipo de usuario no soportado: " + userType);
        }
        return handler;
    }
}
