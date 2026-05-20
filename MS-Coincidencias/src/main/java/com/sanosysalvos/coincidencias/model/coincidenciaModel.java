package com.sanosysalvos.coincidencias.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "coincidencias")
public class coincidenciaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCoincidencia;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_reporte_perdida", referencedColumnName = "id_reporte")
    private reporteModel reportePerdida;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_reporte_encontrado", referencedColumnName = "id_reporte")
    private reporteModel reporteEncontrado;

    private String fechaCoincidencia;
}
