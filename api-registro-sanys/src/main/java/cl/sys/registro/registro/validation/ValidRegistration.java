package cl.sys.registro.registro.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = RegistrationValidator.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidRegistration {
    String message() default "Campos requeridos faltantes para el tipo de usuario";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
