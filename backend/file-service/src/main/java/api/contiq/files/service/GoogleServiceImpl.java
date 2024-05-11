package api.contiq.files.service;

import api.contiq.files.dto.FileChangeResponse;
import api.contiq.files.dto.FileMetaDataRequestDto;
import api.contiq.files.entities.File;
import api.contiq.files.entities.FileData;
import api.contiq.files.entities.User;
import api.contiq.files.exceptions.FilePersistException;
import api.contiq.files.exceptions.PDFParseException;
import api.contiq.files.repositories.FileDataRepository;
import api.contiq.files.repositories.FileRepository;
import api.contiq.files.repositories.UserRepository;
import api.contiq.files.utils.FileDataUtils;
import api.contiq.files.utils.PDFUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Optional;


@Service
@Slf4j
public class GoogleServiceImpl implements GoogleService {
    private static final String FILE_SAVED = "File has been uploaded successfully";
    private final FileDataRepository fileDataRepository;

    private final FileRepository fileRepository;
    private final UserRepository userRepository;

    private final PDFUtils pdfUtils;
    @Value("${file.storage.base}")
    private String baseStorageLocation;

    @Autowired

    public GoogleServiceImpl(FileDataRepository fileDataRepository,
                             FileRepository fileRepository, UserRepository userRepository,
                             PDFUtils pdfUtils) {
        this.fileDataRepository = fileDataRepository;
        this.fileRepository = fileRepository;
        this.userRepository = userRepository;
        this.pdfUtils = pdfUtils;
    }

    @Override
    public FileChangeResponse saveFileFromGoogleDrive(FileMetaDataRequestDto metadata) throws FilePersistException {
        File file = new File();
        try {
            Optional<User> user = userRepository.findById(metadata.getUserId());
            String sanitizeFileName = FileDataUtils.sanitizeFileName(metadata.getFileName());
            Path path = Paths.get(baseStorageLocation, String.valueOf(metadata.getUserId()), sanitizeFileName);
            ByteArrayOutputStream gDriveDownloadedFileByteArrayStream = GoogleDriveService.downloadFile(metadata.getFileId());
            log.info(gDriveDownloadedFileByteArrayStream.toString());
            FileDataUtils.populateFileEntity(file, metadata, user.get());
            file.setFilePath(path.toString());
            fileRepository.save(file);
            FileData elasticFileEntity = getElasticFileEntity(gDriveDownloadedFileByteArrayStream.toByteArray(), metadata.getUserId(), metadata.getFileName());
            fileDataRepository.save(elasticFileEntity);
            saveFileInDirectory(gDriveDownloadedFileByteArrayStream.toByteArray(), path);
        } catch (Exception ex) {
            throw new FilePersistException(ex.getMessage());
        }
        return new FileChangeResponse(FILE_SAVED + "with id : " + file.getGoogleFileId());
    }

    private FileData getElasticFileEntity(byte[] byteArray, Integer userId, String fileName) throws IOException, PDFParseException {
        String content = pdfUtils.getText(byteArray);
        FileData elasticFileEntity = new FileData();
        elasticFileEntity.setFileName(fileName);
        elasticFileEntity.setFileContent(content);
        elasticFileEntity.setCreatedAt(new Date());
        elasticFileEntity.setUserId(userId);
        return elasticFileEntity;
    }

    public static void saveFileInDirectory(byte[] content, Path path) throws IOException {
        Files.createDirectories(path.getParent());
        Files.write(path, content);
    }
}
