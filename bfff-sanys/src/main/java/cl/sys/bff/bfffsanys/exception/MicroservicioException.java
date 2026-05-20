package cl.sys.bff.bfffsanys.exception;

import lombok.Getter;

@Getter
public class MicroservicioException extends RuntimeException {

    private final int status;
    private final Object body;

    public MicroservicioException(int status, Object body) {
        super("Error del microservicio: " + status);
        this.status = status;
        this.body = body;
    }
}
