package suai.funny_login.repositoty;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import suai.funny_login.entity.UserEntity;

@Repository
public interface RegistrationRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);
}
