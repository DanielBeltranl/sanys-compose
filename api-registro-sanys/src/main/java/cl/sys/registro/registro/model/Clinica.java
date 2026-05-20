package cl.sys.registro.registro.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "clinica")
public class Clinica {

    @Id
    private UUID id;

    @Column(name = "clinica_name")
    private String clinicaName;

    @Column(name = "address")
    private String address;
}
