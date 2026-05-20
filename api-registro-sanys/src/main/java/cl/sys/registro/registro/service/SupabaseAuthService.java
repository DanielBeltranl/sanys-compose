package cl.sys.registro.registro.service;

import cl.sys.registro.registro.dto.RegisterRequest;
import cl.sys.registro.registro.dto.SupabaseAuthResult;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SupabaseAuthService {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.anon-key}")
    private String anonKey;

    @Value("${supabase.service-role-key}")
    private String serviceRoleKey;

    private final RestTemplate restTemplate;

    public SupabaseAuthResult signUp(RegisterRequest request, String role) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("apikey", anonKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "email", request.getEmail(),
                "password", request.getPassword(),
                "data", Map.of(
                        "role", role,
                        "user_type", request.getUserType(),
                        "phone", request.getPhone() != null ? request.getPhone().toString() : ""
                )
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                supabaseUrl + "/auth/v1/signup", entity, Map.class
        );

        Map<?, ?> responseBody = response.getBody();
        Map<?, ?> user = (Map<?, ?>) responseBody.get("user");

        UUID userId = UUID.fromString((String) user.get("id"));
        String token = (String) responseBody.get("access_token");

        return new SupabaseAuthResult(userId, token);
    }

    public void deleteUser(UUID userId) {
        // The trigger on auth.users creates a profiles record automatically.
        // Deleting the auth user while profiles references it violates the FK,
        // so we delete the profile first.
        HttpHeaders restHeaders = new HttpHeaders();
        restHeaders.set("apikey", serviceRoleKey);
        restHeaders.set("Authorization", "Bearer " + serviceRoleKey);
        restHeaders.set("Prefer", "return=minimal");

        try {
            restTemplate.exchange(
                    supabaseUrl + "/rest/v1/profiles?id=eq." + userId,
                    HttpMethod.DELETE,
                    new HttpEntity<>(restHeaders),
                    Void.class
            );
        } catch (Exception ignored) {
            // Profile may not exist if the trigger didn't fire — safe to ignore
        }

        HttpHeaders authHeaders = new HttpHeaders();
        authHeaders.set("apikey", serviceRoleKey);
        authHeaders.set("Authorization", "Bearer " + serviceRoleKey);

        restTemplate.exchange(
                supabaseUrl + "/auth/v1/admin/users/" + userId,
                HttpMethod.DELETE,
                new HttpEntity<>(authHeaders),
                Void.class
        );
    }
}
