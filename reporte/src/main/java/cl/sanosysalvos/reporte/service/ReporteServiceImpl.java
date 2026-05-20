package cl.sanosysalvos.reporte.service;

import cl.sanosysalvos.reporte.dto.ReporteRequestDTO;
import cl.sanosysalvos.reporte.dto.ReporteResponseDTO;
import cl.sanosysalvos.reporte.model.ReporteModel;
import cl.sanosysalvos.reporte.repository.ReporteRepository;
import cl.sanosysalvos.reporte.messaging.ReportePublisher;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReporteServiceImpl implements ReporteService {

    private final ReporteRepository reporteRepository;
    private final ReportePublisher reportePublisher;
    // private final GeoService geoService;

    public ReporteServiceImpl(
        ReporteRepository reporteRepository,
        ReportePublisher reportePublisher) {
        this.reporteRepository = reporteRepository;
        this.reportePublisher = reportePublisher;
    }

    @Override
    @Transactional
    public ReporteResponseDTO guardarReporte(ReporteRequestDTO dto) {
        // Mapear DTO a Entity
        ReporteModel reporte = new ReporteModel();
        reporte.setIdUsuario(dto.getIdUsuario());
        reporte.setTipoReporte(dto.getTipoReporte());
        reporte.setTipoMascota(dto.getTipoMascota());
        reporte.setNombreMascota(dto.getNombreMascota());
        reporte.setColor(dto.getColor());
        reporte.setTamano(dto.getTamano());
        reporte.setRaza(dto.getRaza());
        reporte.setFotoMascota(dto.getFotoMascota());
        reporte.setDescripcion(dto.getDescripcion());
        reporte.setDireccion(dto.getDireccion());
        reporte.setSexo(dto.getSexo());

        // GeoService comentado: las coordenadas llegan desde el cliente
        // if ((dto.getCoordenadas() == null || dto.getCoordenadas().isBlank())
        //         && dto.getDireccion() != null && !dto.getDireccion().isBlank()) {
        //     String coordenadasCalculadas = geoService.obtenerCoordenadas(dto.getDireccion());
        //     reporte.setCoordenadas(coordenadasCalculadas);
        // } else {
        //     reporte.setCoordenadas(dto.getCoordenadas());
        // }
        reporte.setCoordenadas(dto.getCoordenadas());

        // Persistir en base de datos
        ReporteModel guardado = reporteRepository.save(reporte);

        // Mapear a DTO para responder
        ReporteResponseDTO responseDTO = mapToResponseDTO(guardado);

        // Publicar en RabbitMQ para que otros microservicios (ej. Coincidencias) se enteren
        reportePublisher.publicarNuevoReporte(responseDTO);

        return responseDTO;
    }

    @Override
    public List<ReporteResponseDTO> obtenerTodos(double latitud, double longitud) {
        return reporteRepository.findAll()
            .stream()
            .filter(r -> estaEnRadio(r.getCoordenadas(), latitud, longitud))
            .map(this::mapToResponseDTO)
            .collect(Collectors.toList());
    }

    private boolean estaEnRadio(String coordenadas, double latRef, double lonRef) {
        if (coordenadas == null || coordenadas.isBlank()) return false;
        String[] partes = coordenadas.split(",");
        if (partes.length != 2) return false;
        try {
            double lat = Double.parseDouble(partes[0].trim());
            double lon = Double.parseDouble(partes[1].trim());
            return haversine(latRef, lonRef, lat, lon) <= 1.0;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private double haversine(double lat1, double lon1, double lat2, double lon2) {
        final double R = 6371;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    @Override
    public ReporteResponseDTO obtenerPorId(Long id) {
        ReporteModel reporte = reporteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Reporte no encontrado con ID: " + id));
        return mapToResponseDTO(reporte);
    }

    @Override
    @Transactional
    public ReporteResponseDTO actualizarReporte(Long id, ReporteRequestDTO dto) {
        ReporteModel reporteExistente = reporteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("No se puede actualizar. Reporte no encontrado con ID: " + id));

        reporteExistente.setIdUsuario(dto.getIdUsuario());
        reporteExistente.setTipoReporte(dto.getTipoReporte());
        reporteExistente.setTipoMascota(dto.getTipoMascota());
        reporteExistente.setNombreMascota(dto.getNombreMascota());
        reporteExistente.setColor(dto.getColor());
        reporteExistente.setTamano(dto.getTamano());
        reporteExistente.setRaza(dto.getRaza());
        reporteExistente.setFotoMascota(dto.getFotoMascota());
        reporteExistente.setDescripcion(dto.getDescripcion());
        reporteExistente.setDireccion(dto.getDireccion());

        // GeoService comentado: las coordenadas llegan desde el cliente
        // if ((dto.getCoordenadas() == null || dto.getCoordenadas().isBlank())
        //         && dto.getDireccion() != null && !dto.getDireccion().isBlank()) {
        //     String coordenadasCalculadas = geoService.obtenerCoordenadas(dto.getDireccion());
        //     reporteExistente.setCoordenadas(coordenadasCalculadas);
        // } else {
        //     reporteExistente.setCoordenadas(dto.getCoordenadas());
        // }
        reporteExistente.setCoordenadas(dto.getCoordenadas());

        ReporteModel reporteActualizado = reporteRepository.save(reporteExistente);
        return mapToResponseDTO(reporteActualizado);
    }

    @Override
    @Transactional
    public void eliminarReporte(Long id) {
        if (!reporteRepository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar. Reporte no encontrado con ID: " + id);
        }
        reporteRepository.deleteById(id);
    }

    private ReporteResponseDTO mapToResponseDTO(ReporteModel model) {
        return ReporteResponseDTO.builder()
            .id(model.getIdReporte())
            .tipoReporte(model.getTipoReporte())
            .tipoMascota(model.getTipoMascota())
            .nombreMascota(model.getNombreMascota())
            .color(model.getColor())
            .tamano(model.getTamano())
            .raza(model.getRaza())
            .fotoMascota(model.getFotoMascota())
            .descripcion(model.getDescripcion())
            .direccion(model.getDireccion())
            .coordenadas(model.getCoordenadas())
            .sexo(model.getSexo())
            .build();
    }
}