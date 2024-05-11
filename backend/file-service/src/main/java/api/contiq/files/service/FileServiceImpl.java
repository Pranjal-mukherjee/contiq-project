package api.contiq.files.service;

import api.contiq.files.dto.FileChangeResponse;
import api.contiq.files.dto.FileDto;
import api.contiq.files.dto.FileResponse;
import api.contiq.files.entities.File;
import api.contiq.files.entities.FileData;
import api.contiq.files.entities.User;
import api.contiq.files.exceptions.FilePersistException;
import api.contiq.files.exceptions.FileUpdateException;
import api.contiq.files.exceptions.FilesFetchException;
import api.contiq.files.exceptions.PDFParseException;
import api.contiq.files.repositories.FileDataRepository;
import api.contiq.files.repositories.FileRepository;
import api.contiq.files.repositories.UserRepository;
import api.contiq.files.utils.PDFUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class FileServiceImpl implements FileService {
    private static final String FILE_SAVED = "File has been uploaded successfully";
    private static final String FILE_UPDATED = "File has been updated successfully";
    private static final String USER_NOT_FOUND = "No user was found for the given id";
    public static final String APPLICATION_PDF = "application/pdf";
    public static final String DELIMITER = "/";
    private final FileDataRepository fileDataRepository;

    private final FileRepository fileRepository;
    private final UserRepository userRepository;

    private final PDFUtils pdfUtils;

    public FileServiceImpl(FileDataRepository fileDataRepository, FileRepository fileRepository,
                           UserRepository userRepository,
                           PDFUtils pdfUtils) {
        this.fileDataRepository = fileDataRepository;
        this.fileRepository = fileRepository;
        this.userRepository = userRepository;
        this.pdfUtils = pdfUtils;
    }

    /**
     * Gets Files with or without filters
     *
     * @param userId
     * @param fileType
     * @param startDate
     * @param endDate
     * @return
     */
    @Override
    public FileResponse getFiles(Integer userId, String fileType, String startDate, String endDate) throws FilesFetchException {
        log.info("Inside class:: {} method:: getFiles", this.getClass().getName());
        List<File> filesList;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        FileResponse fileResponse = new FileResponse();
        try {
            if (fileType != null && startDate != null && endDate != null) {
                log.info("getting files with userId: {}, fileType: {}, startDate: {}, endDate: {}", userId, fileType, startDate, endDate);
                LocalDate start = LocalDate.parse(startDate, formatter);
                LocalDate end = LocalDate.parse(endDate, formatter);
                filesList = fileRepository.findByUserIdAndTypeAndUploadedAtBetween(userId, fileType, start, end);
            } else if (fileType != null) {
                log.info("getting files with userId: {}, fileType: {}", userId, fileType);
                filesList = fileRepository.findByUserIdAndType(userId, fileType);
            } else if (startDate != null && endDate != null) {
                log.info("getting files with userId: {}, startDate: {}, endDate: {}", userId, startDate, endDate);
                LocalDate start = LocalDate.parse(startDate, formatter);
                LocalDate end = LocalDate.parse(endDate, formatter);
                filesList = fileRepository.findByUserIdAndUploadedAtBetween(userId, start, end);
            } else {
                log.info("getting files with userId: {}", userId);
                filesList = fileRepository.findByUserId(userId);
            }
            if (filesList != null)
                log.info("files list size: {}", filesList.size());
            if (filesList != null) {
                List<FileDto> dtoList = filesList.stream().map(this::getFileDto).toList();
                fileResponse.setFiles(dtoList);
            }
        } catch (Exception ex) {
            log.info("Exception occured in getFiles method");
            throw new FilesFetchException(ex.getMessage());
        }
        return fileResponse;
    }

    private FileDto getFileDto(File element) {
        FileDto fileDto = new FileDto();
        fileDto.setFileId(element.getId());
        fileDto.setFileType(element.getType());
        fileDto.setFileName(element.getName());
        fileDto.setUserId(element.getUser().getId());
        fileDto.setUploadedAt(element.getUploadedAt().toString());
        fileDto.setGoogleFileId(element.getGoogleFileId());
        fileDto.setFilePath(element.getFilePath());
        return fileDto;
    }

    /**
     * Saves new file
     *
     * @param userId
     * @param file
     * @param filename
     * @return
     */
    @Override
    public FileChangeResponse saveFile(Integer userId, MultipartFile file, String filename) throws FilePersistException {
        log.info("Inside class:: {} method:: saveFile", this.getClass().getName());
        try {
            log.info("Fetching the user with userId: {}", userId);
            Optional<User> user = userRepository.findById(userId);

            if (user.isPresent()) {
                log.info("UserDetails: {}", user.get().toString());
                File fileEntity = new File();
                String path = saveFileToDirectory(file, userId);
                populateFileEntity(filename, fileEntity, user.get(), path);
                fileRepository.save(fileEntity);
                FileData elasticFileEntity = getElasticFileEntity(file.getBytes(), userId, filename);
                fileDataRepository.save(elasticFileEntity);
            } else {
                return new FileChangeResponse(USER_NOT_FOUND);
            }
        } catch (Exception ex) {
            throw new FilePersistException(ex.getMessage());
        }
        return new FileChangeResponse(FILE_SAVED);
    }

    /**
     * Overrides Existing file to the updated file
     *
     * @param userId
     * @param fileName
     * @param file
     * @return
     */
    @Override
    public FileChangeResponse updateFile(Integer userId, String fileName, MultipartFile file) throws FileUpdateException {
        log.info("Inside class:: {} method:: updateFile", this.getClass().getName());
        try {
            File existingFile = fileRepository.findByNameAndUserId(fileName, userId);
            existingFile.setUploadedAt(LocalDate.now());
            fileRepository.save(existingFile);
            saveFileToDirectory(file, userId);
        } catch (Exception ex) {
            throw new FileUpdateException(ex.getMessage());
        }
        return new FileChangeResponse(FILE_UPDATED);
    }

    @Override
    public ResponseEntity<Resource> getFileResource(String fileName, Integer userId) throws FileNotFoundException {
        try {
            Path filePath = Path.of("uploads/" + userId + DELIMITER + fileName);
            Resource resource = getResource(filePath);
            log.info("filepath built: {}", resource.getURI());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(APPLICATION_PDF))
                        .body(resource);
            } else {
                throw new FileNotFoundException(fileName);
            }
        } catch (Exception e) {
            throw new FileNotFoundException(fileName);
        }
    }

    private Resource getResource(Path path) throws MalformedURLException {
        try {
            Path baseDirectory = Paths.get(System.getProperty("user.dir"));
            Path resolvedPath = baseDirectory.resolve(path);

            if (resolvedPath.startsWith(baseDirectory) && resolvedPath.toFile().exists()) {
                return new UrlResource(resolvedPath.toUri());
            } else {
                log.info("Exception because of invalid path: {}", resolvedPath);
                throw new MalformedURLException("Invalid file path");
            }
        } catch (IOException e) {
            log.info("Exception because of URI: {}", path);
            throw new MalformedURLException("Failed to create resource URL");
        }
    }

    private static void populateFileEntity(String filename, File fileEntity, User user,
                                           String path) throws IOException {
        log.info("populating File Entity");
        fileEntity.setType(filename.split("\\.")[1]);
        fileEntity.setName(filename);
        fileEntity.setUploadedAt(LocalDate.now());
        fileEntity.setFilePath(path);
        fileEntity.setUser(user);
        log.info("File Entity: {}", fileEntity.toString());
    }

    private FileData getElasticFileEntity(byte[] file, Integer userId, String fileName) throws IOException, PDFParseException {
        log.info("populating Elastic File Entity");
        byte[] pdfBytes = file;
        String content = pdfUtils.getText(pdfBytes);
        FileData elasticFileEntity = new FileData();
        elasticFileEntity.setFileName(fileName);
        elasticFileEntity.setFileContent(content);
        elasticFileEntity.setCreatedAt(new Date());
        elasticFileEntity.setUserId(userId);
        log.info("Elastic File Entity: {}", elasticFileEntity.toString());
        return elasticFileEntity;
    }

    private String saveFileToDirectory(MultipartFile file, Integer userId) throws IOException {
        String fileName = Objects.requireNonNull(file.getOriginalFilename());
        Path uploadDirectory = Paths.get(System.getProperty("user.dir"), "uploads", String.valueOf(userId));
        if (!java.nio.file.Files.exists(uploadDirectory)) {
            java.nio.file.Files.createDirectories(uploadDirectory);
        }
        Path filePath = uploadDirectory.resolve(fileName);
        byte[] pdfData = file.getBytes();
        java.nio.file.Files.write(filePath, pdfData);
        return filePath.toString();
    }

}
