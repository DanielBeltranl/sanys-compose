package cl.sanosysalvos.reporte.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "reportes")
@Data
public class ReporteModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reporte")
    private Long idReporte;

    @Column(name = "id_usuario", columnDefinition = "uuid REFERENCES auth.users(id)")
    private UUID idUsuario;

    @Column(name = "coordenadas")
    private String coordenadas;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_reporte")
    private TipoReporte tipoReporte;

    @Column(name = "tipo_mascota")
    private String tipoMascota;

    @Column(name = "nombre_mascota")
    private String nombreMascota;

    @Column(name = "color")
    private String color;

    @Enumerated(EnumType.STRING)
    @Column(name = "tamano")
    private TamanoMascota tamano;

    @Column(name = "raza")
    private String raza;

    @Column(name = "foto_mascota")
    private String fotoMascota;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "direccion", columnDefinition = "TEXT")
    private String direccion;

    @Column(name = "estado")
    private String estado = "ACTIVO";
    
    @Column(name = "sexo")
    private String sexo;


}