package cl.sanosysalvos.reporte.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Service
public class GeoService {

    @Value("${locationiq.api-key}")
    private String apiKey;

    public String obtenerCoordenadas(String direccion) {
        // 1. Limpiamos la dirección: quitamos espacios extra y reemplazamos por %20 para la URL
        String direccionFormateada = direccion.trim().replace(" ", "+");
        
        
        String url = "https://us1.locationiq.com/v1/search?key=" + apiKey + 
                     "&q=" + direccionFormateada + "&format=json";

        RestTemplate restTemplate = new RestTemplate();

        try {
            System.out.println(">>> Consultando LocationIQ: " + url);
            
            // 3. Ejecutamos la petición. LocationIQ devuelve una lista []
            List<Map<String, Object>> response = restTemplate.getForObject(url, List.class);

            if (response != null && !response.isEmpty()) {
                // 4. Extraemos lat y lon del primer resultado
                Map<String, Object> primerResultado = response.get(0);
                String lat = (String) primerResultado.get("lat");
                String lon = (String) primerResultado.get("lon");
                
                return lat + "," + lon;
            }
            return "0,0"; // No se encontró
        } catch (Exception e) {
            System.err.println(">>> Error en GeoService: " + e.getMessage());
            return "Error: Servicio de mapas no disponible";
        }
    }
}