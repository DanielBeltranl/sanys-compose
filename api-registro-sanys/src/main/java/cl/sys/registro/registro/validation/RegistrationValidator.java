package cl.sys.registro.registro.validation;

import cl.sys.registro.registro.dto.RegisterRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class RegistrationValidator implements ConstraintValidator<ValidRegistration, RegisterRequest> {

    @Override
    public boolean isValid(RegisterRequest request, ConstraintValidatorContext context) {
        if (request == null) return false;

        boolean valid = true;
        context.disableDefaultConstraintViolation();

        valid &= requireField(context, request.getEmail(), "email");
        valid &= requireField(context, request.getPassword(), "password");
        valid &= requireField(context, request.getUserType(), "userType");
        valid &= requireNotNull(context, request.getPhone(), "phone");

        if (request.getUserType() != null) {
            valid &= switch (request.getUserType().toLowerCase()) {
                case "persona" -> {
                    boolean ok = requireField(context, request.getName(), "name");
                    ok &= requireField(context, request.getLastName(), "lastName");
                    yield ok;
                }
                case "clinica" -> {
                    boolean ok = requireField(context, request.getClinicaName(), "clinicaName");
                    ok &= requireField(context, request.getAddress(), "address");
                    yield ok;
                }
                case "refugio" -> {
                    boolean ok = requireField(context, request.getRefugioName(), "refugioName");
                    ok &= requireField(context, request.getAdress(), "adress");
                    yield ok;
                }
                default -> {
                    context.buildConstraintViolationWithTemplate(
                            "userType debe ser: persona, clinica o refugio")
                            .addPropertyNode("userType")
                            .addConstraintViolation();
                    yield false;
                }
            };
        }

        return valid;
    }

    private boolean requireField(ConstraintValidatorContext ctx, String value, String field) {
        if (value == null || value.isBlank()) {
            ctx.buildConstraintViolationWithTemplate("El campo " + field + " es obligatorio")
                    .addPropertyNode(field)
                    .addConstraintViolation();
            return false;
        }
        return true;
    }

    private boolean requireNotNull(ConstraintValidatorContext ctx, Object value, String field) {
        if (value == null) {
            ctx.buildConstraintViolationWithTemplate("El campo " + field + " es obligatorio")
                    .addPropertyNode(field)
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}
