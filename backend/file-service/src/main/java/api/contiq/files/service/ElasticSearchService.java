package api.contiq.files.service;

import api.contiq.files.dto.FileDataDto;
import api.contiq.files.exceptions.FileUploadException;
import api.contiq.files.exceptions.FilesFetchException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ElasticSearchService {
    public String uploadFile(MultipartFile file, Integer userId) throws FileUploadException;

    public List<FileDataDto> findBySearchTerm(String query, String userId) throws FilesFetchException;

    String deleteFileById(String fileName) throws FilesFetchException;

}
