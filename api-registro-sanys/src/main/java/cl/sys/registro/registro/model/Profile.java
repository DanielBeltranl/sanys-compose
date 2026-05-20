package cl.sys.registro.registro.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.UUID;
@Entity
@Data
@Table(name = "profiles")
public class Profile {

    @Id
    private UUID id;

    @Column (name = "role")
    private String role;

    @Column (name = "user_type")
    private String  userType;

    @Column (name = "phone")
    private Long phone;


}
