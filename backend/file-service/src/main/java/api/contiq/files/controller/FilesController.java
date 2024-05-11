package api.contiq.files.controller;

import api.contiq.files.dto.FileChangeResponse;
import api.contiq.files.dto.FileDataDto;
import api.contiq.files.dto.FileMetaDataRequestDto;
import api.contiq.files.dto.FileResponse;
import api.contiq.files.exceptions.*;
import api.contiq.files.service.ElasticSearchService;
import api.contiq.files.service.FileService;
import api.contiq.files.service.GoogleService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.util.List;

@RestController
@RequestMapping("api/v1/files")
@Slf4j
public class FilesController {

    FileService fileService;

    GoogleService googleService;

    ElasticSearchService elasticSearchService;

    public FilesController(FileService fileService, GoogleService googleService, ElasticSearchService elasticSearchService) {
        this.fileService = fileService;
        this.googleService = googleService;
        this.elasticSearchService = elasticSearchService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<FileResponse> getRecentFiles(
            @PathVariable Integer userId,
            @RequestParam(required = false) String fileType,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) throws FilesFetchException {
        FileResponse fileResponse = fileService.getFiles(userId, fileType, startDate, endDate);
        return new ResponseEntity<>(fileResponse, HttpStatus.OK);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<FileChangeResponse> saveFile(
            @PathVariable Integer userId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("filename") String filename) throws FilePersistException {
        FileChangeResponse fileChangeResponse = fileService.saveFile(userId, file, filename);
        return ResponseEntity.ok(fileChangeResponse);
    }

    @PostMapping("/update/{userId}")
    public ResponseEntity<FileChangeResponse> updateFile(
            @PathVariable Integer userId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("filename") String filename) throws FileUpdateException {
        FileChangeResponse fileChangeResponse = fileService.updateFile(userId, filename, file);
        return ResponseEntity.ok(fileChangeResponse);
    }

    @GetMapping("/search/{userId}")
    public ResponseEntity<List<FileDataDto>> searchFiles(
            @PathVariable("userId") String userId,
            @RequestParam("text") String text) throws FilesFetchException {
        return ResponseEntity.ok(elasticSearchService.findBySearchTerm(text, userId));
    }

    @PostMapping("elastic/upload")
    public ResponseEntity<String> fileUpload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Integer userId) throws FileUploadException {
        String message = elasticSearchService.uploadFile(file, userId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> fileDelete(
            @PathVariable String id
            ) throws FilesFetchException {
        String message = elasticSearchService.deleteFileById(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/resource/{userId}")
    public ResponseEntity<Resource> getFileResource(
            @PathVariable("userId") Integer userId, @RequestParam("fileName") String fileName) throws FileNotFoundException {
        return fileService.getFileResource(fileName, userId);
            }
    @PostMapping("/drive")
    public ResponseEntity<FileChangeResponse> uploadFromDrive(@RequestPart("metadata") String metadataJson) throws FilePersistException{
        ObjectMapper objectMapper = new ObjectMapper();
        FileMetaDataRequestDto parsedDto = null;
        try {
            parsedDto = objectMapper.readValue(metadataJson, FileMetaDataRequestDto.class);
        } catch (JsonProcessingException e) {
            throw new ParseDataException("metadata");
        }
        FileChangeResponse fileChangeResponse = googleService.saveFileFromGoogleDrive(parsedDto);
        return ResponseEntity.ok(fileChangeResponse);
    }
}
