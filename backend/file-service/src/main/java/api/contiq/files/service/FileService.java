package api.contiq.files.service;

import api.contiq.files.dto.FileChangeResponse;
import api.contiq.files.dto.FileResponse;
import api.contiq.files.exceptions.FilePersistException;
import api.contiq.files.exceptions.FileUpdateException;
import api.contiq.files.exceptions.FilesFetchException;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;

public interface FileService {
    FileResponse getFiles(Integer userId, String fileType, String startDate, String endDate) throws FilesFetchException;

    FileChangeResponse saveFile(Integer userId, MultipartFile file, String filename) throws FilePersistException;

    FileChangeResponse updateFile(Integer userId, String fileName, MultipartFile file) throws FileUpdateException;

    ResponseEntity<Resource> getFileResource(String fileName, Integer userId) throws FileNotFoundException;
}
