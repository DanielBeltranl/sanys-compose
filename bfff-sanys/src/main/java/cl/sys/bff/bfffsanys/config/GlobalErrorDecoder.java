package cl.sys.bff.bfffsanys.config;

import cl.sys.bff.bfffsanys.exception.MicroservicioException;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.Response;
import feign.codec.ErrorDecoder;

public class GlobalErrorDecoder implements ErrorDecoder {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Exception decode(String methodKey, Response response) {
        try {
            byte[] body = response.body().asInputStream().readAllBytes();
            Object parsedBody = objectMapper.readValue(body, Object.class);
            return new MicroservicioException(response.status(), parsedBody);
        } catch (Exception e) {
            return new MicroservicioException(response.status(), null);
        }
    }
}
