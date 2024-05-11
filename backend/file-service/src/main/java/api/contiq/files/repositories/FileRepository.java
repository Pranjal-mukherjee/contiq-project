package api.contiq.files.repositories;

import api.contiq.files.entities.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<File, Integer> {

    List<File> findByUserId(Integer userId);

    List<File> findByUserIdAndType(Integer userId, String type);

    List<File> findByUserIdAndUploadedAtBetween(Integer userId, LocalDate startDate, LocalDate endDate);

    List<File> findByUserIdAndTypeAndUploadedAtBetween(Integer userId, String type, LocalDate startDate, LocalDate endDate);

    File findByNameAndUserId(String fileName, Integer userId);
}