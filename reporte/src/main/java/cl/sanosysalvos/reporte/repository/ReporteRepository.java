package cl.sanosysalvos.reporte.repository;

import cl.sanosysalvos.reporte.model.ReporteModel;
import cl.sanosysalvos.reporte.dto.ReporteResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReporteRepository extends JpaRepository<ReporteModel, Long> {

    @Query("SELECT new cl.sanosysalvos.reporte.dto.ReporteResponseDTO(r.idReporte, r.raza, r.tipoReporte) " +
           "FROM ReporteModel r " +
           "WHERE r.idUsuario = :idUsuario")
    List<ReporteResponseDTO> findReportesByUsuarioId(@Param("idUsuario") Integer idUsuario);

}