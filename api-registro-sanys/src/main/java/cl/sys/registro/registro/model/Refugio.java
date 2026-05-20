package cl.sys.registro.registro.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "refugio")
public class Refugio {

    @Id
    private UUID id;

    @Column(name = "refugio_name")
    private String refugioName;

    @Column(name = "adress")
    private String adress;
}
