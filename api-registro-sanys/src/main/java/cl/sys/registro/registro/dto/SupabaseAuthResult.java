package cl.sys.registro.registro.dto;

import java.util.UUID;

public record SupabaseAuthResult(UUID userId, String token) {}
