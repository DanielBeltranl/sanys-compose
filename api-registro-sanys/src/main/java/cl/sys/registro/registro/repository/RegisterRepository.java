package cl.sys.registro.registro.repository;

import cl.sys.registro.registro.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RegisterRepository extends JpaRepository<Profile, UUID> {
}
