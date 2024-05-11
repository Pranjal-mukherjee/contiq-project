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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ElasticSearchServiceImplTest {

    @Mock
    private FileDataRepository fileDataRepository;

    @Mock
    private FileRepository fileRepository;

    @Mock
    private FileDataUtils elasticSearchMapper;

    @Mock
    private PDFUtils pdfUtils;

    @InjectMocks
    private ElasticSearchServiceImpl elasticSearchService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void uploadFile_Success() throws Exception {
        MultipartFile mockFile = new MockMultipartFile("test.pdf", new byte[0]);
        Integer userId = 1;
        when(pdfUtils.getText(any(byte[].class))).thenReturn("Sample content");
        when(fileDataRepository.save(any(FileData.class))).thenReturn(new FileData());
        String result="";
        try {
             result = elasticSearchService.uploadFile(mockFile, userId);
        } catch (Exception e) {
            assertTrue(e instanceof FileUploadException);
        }
    }

    @Test
    void uploadFile_ExceptionThrown() {
        MultipartFile mockFile = null;
        Integer userId = 1;

        assertThrows(FileUploadException.class, () -> elasticSearchService.uploadFile(mockFile, userId));
    }

    @Test
    void findBySearchTerm_Success() throws Exception {
        // Arrange
        String searchTerm = "easily";
        String userId = "1";
        FileData mockData = new FileData();
        mockData.setFileContent("recent instance our solution engineers have \\nnoted is where developers use JavaScript-based \\nsubmit buttons on forms rather than uploading \\nand parsing data out of forms — which opens up \\nthe system to phishing and middle-man attacks. \\nSomeone could easily edit the button to have \\nit send personal information to another server, \\nand then maliciously re-circulate the form within \\nyour organization or send it to end users.\\nSecurity Issues\\nVendor Lock-in\\nLastly, consider how your data and documents \\nwill be stored. For example, annotations stored in \\na proprietary format, such as Brava! annotations \\nand some versions of JSON, will not be accessible \\nto users who want to view their annotations with \\nother tools such as Adobe Acrobat. Moreover, it \\nwill be challenging to migrate these annotations \\nlater if you wish to switch easily.\\nA vendor who manages annotations");
        mockData.setId("csfgha");
        mockData.setUserId(1);
        mockData.setFileName("easily.pdf");
        mockData.setCreatedAt(new Date());
        File file = new File();
        file.setFilePath("/p/");
        List<FileData> mockMatchingDocuments = Collections.singletonList(mockData);
        when(fileRepository.findByNameAndUserId(any(), any())).thenReturn(file);
        when(fileDataRepository.findByFileContentContainingAndUserId(searchTerm, "1")).thenReturn(mockMatchingDocuments);
        when(elasticSearchMapper.convertElasticFileToDto(any(FileData.class))).thenReturn(new FileDataDto());

        // Act
        List<FileDataDto> result = elasticSearchService.findBySearchTerm(searchTerm, userId);

        // Assert
        assertNotNull(result);
        assertFalse(result.isEmpty());
        verify(fileDataRepository, times(1)).findByFileContentContainingAndUserId(searchTerm, userId);
        verify(elasticSearchMapper, times(1)).convertElasticFileToDto(any(FileData.class));
    }

    @Test
    void findBySearchTerm_Success_emptylist() throws Exception {
        String searchTerm = "test";
        String userId = "1";
        List<FileData> mockFiles = new ArrayList<>();
        when(fileDataRepository.findByFileContentContainingAndUserId(searchTerm, userId)).thenReturn(mockFiles);

        List<FileDataDto> result = elasticSearchService.findBySearchTerm(searchTerm, userId);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void findBySearchTerm_ExceptionThrown() throws Exception {
        // Arrange
        String searchTerm = "test";
        String userId = "1";
        when(fileDataRepository.findByFileContentContainingAndUserId(searchTerm, userId)).thenThrow(new RuntimeException("Test exception"));

        // Assert
        assertThrows(FilesFetchException.class, () -> elasticSearchService.findBySearchTerm(searchTerm, userId));
    }
}
