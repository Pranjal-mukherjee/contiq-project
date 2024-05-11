package api.contiq.files.service;

import api.contiq.files.dto.FileDataDto;
import api.contiq.files.entities.File;
import api.contiq.files.entities.FileData;
import api.contiq.files.exceptions.FileUploadException;
import api.contiq.files.exceptions.FilesFetchException;
import api.contiq.files.repositories.FileDataRepository;
import api.contiq.files.repositories.FileRepository;
import api.contiq.files.utils.FileDataUtils;
import api.contiq.files.utils.PDFUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
public class ElasticSearchServiceImpl implements ElasticSearchService {
    public static final String UPLOADED_THE_FILE_SUCCESSFULLY = "uploaded the file successfully";

    private FileDataRepository fileDataRepository;

    private FileRepository fileRepository;
    private FileDataUtils elasticSearchMapper;
    private PDFUtils pdfUtils;

    public ElasticSearchServiceImpl(FileDataRepository fileDataRepository, FileDataUtils elasticSearchMapper,
                                    PDFUtils pdfUtils, FileRepository fileRepository) {
        this.fileDataRepository = fileDataRepository;
        this.elasticSearchMapper = elasticSearchMapper;
        this.pdfUtils = pdfUtils;
        this.fileRepository = fileRepository;
    }

    /**
     * Uploads a file to Elasticsearch.
     *
     * @param file   The multipart file to upload.
     * @param userId The user ID associated with the file.
     * @return A success message indicating that the file has been uploaded successfully.
     * @throws FileUploadException If an error occurs during file upload.
     */
    @Override
    public String uploadFile(MultipartFile file, Integer userId) throws FileUploadException {
        try {
            byte[] pdfBytes = file.getBytes();
            String content = pdfUtils.getText(pdfBytes);

            FileData fileEntity = new FileData();
            fileEntity.setFileName(file.getOriginalFilename());
            fileEntity.setFileContent(content);
            fileEntity.setCreatedAt(new Date());
            fileEntity.setUserId(userId);
            fileDataRepository.save(fileEntity);
            return UPLOADED_THE_FILE_SUCCESSFULLY;
        } catch (Exception e) {
            throw new FileUploadException(e.getMessage());
        }
    }

    /**
     * Searches for files in Elasticsearch based on a search term.
     *
     * @param searchTerm The term to search for within file content.
     * @param userId
     * @return A list of FileDataDto objects representing matching files.
     * @throws FilesFetchException If an error occurs during file fetch.
     */
    @Override
    public List<FileDataDto> findBySearchTerm(String searchTerm, String userId) throws FilesFetchException {
        try {
            List<FileData> files = fileDataRepository.findByFileContentContainingAndUserId(searchTerm, userId);

            if (files.isEmpty()) {
                return Collections.emptyList();
            }
            return files.stream()
                    .map(fileData -> {
                        String fileContent = fileData.getFileContent();
                        List<String> searchTexts = extractSearchTexts(fileContent, searchTerm);

                        FileDataDto fileDataDto = elasticSearchMapper.convertElasticFileToDto(fileData);
                        fileDataDto.setSearchTexts(searchTexts);
                        File file =  fileRepository.findByNameAndUserId(fileData.getFileName(), fileData.getUserId());
                        fileDataDto.setFilePath(file.getFilePath());
                        return fileDataDto;
                    })
                    .toList();
        } catch (Exception e) {
            throw new FilesFetchException(e.getMessage());
        }
    }

    /**
     * deletes file from elastic search
     *
     * @param fileName 
     * @return
     */
    @Override
    public String deleteFileById(String fileName) throws FilesFetchException {
        try {
            fileDataRepository.deleteAllByUserId(fileName);
        } catch (Exception e) {
            throw new FilesFetchException("Error deleting file with filename: " + fileName + ". " + e.getMessage());
        }
        return "File has been successfully deleted";
    }

    private List<String> extractSearchTexts(String text, String searchTerm) {
        List<String> searchTexts = new ArrayList<>();

        String regex = "(?i)" + Pattern.quote(searchTerm);
        Matcher matcher = Pattern.compile(regex).matcher(text);

        while (matcher.find() && searchTexts.size() < 3) {
            int start = Math.max(0, matcher.start() - 20);
            int end = Math.min(text.length(), matcher.end() + 20);

            String sentence = text.substring(start, end);

            searchTexts.add(sentence.trim());
        }

        return searchTexts;
    }
}
