package api.contiq.user.repository;

import api.contiq.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    @Query(value = "select * from user where email=:email and password=:password", nativeQuery = true)
    Optional<User> findByEmailAndPassword(String email, String password);
}
