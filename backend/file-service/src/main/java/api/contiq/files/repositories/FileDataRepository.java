package api.contiq.files.repositories;

import api.contiq.files.entities.FileData;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface FileDataRepository extends ElasticsearchRepository<FileData, String>
{
    List<FileData> findByFileName(String fileName);

    List<FileData> findByFileContentContainingAndUserId(String fileContent, String userId);

    void deleteAllByUserId(String fileName);
}