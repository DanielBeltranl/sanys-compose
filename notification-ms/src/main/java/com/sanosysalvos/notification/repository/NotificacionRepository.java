package com.sanosysalvos.notification.repository;

import com.sanosysalvos.notification.model.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {

    @Query("SELECT n FROM Notificacion n WHERE n.id_usuario_reporte_perdida = :idUsuario AND n.estado_notificacion IN ('PENDIENTE', 'FALLIDA')")
    List<Notificacion> findPendientesOFallidasPorUsuario(@Param("idUsuario") String idUsuario);
}
