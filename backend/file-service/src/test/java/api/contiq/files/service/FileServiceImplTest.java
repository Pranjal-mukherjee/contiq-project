package api.contiq.files.service;

import api.contiq.files.dto.FileChangeResponse;
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
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.net.URI;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static api.contiq.files.service.FileServiceImpl.APPLICATION_PDF;
import static api.contiq.files.service.FileServiceImpl.DELIMITER;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(MockitoExtension.class)
class FileServiceImplTest {

    private MockMvc mockMvc;
    @Mock
    private FileRepository fileRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private FileServiceImpl fileService;

    @Mock
    private PDFUtils pdfUtils;

    @Mock
    private FileDataRepository fileDataRepository;

    @Mock
    private Resource resource;

    @Test
    void getFiles_Success() throws FilesFetchException {
        // Arrange
        int userId = 1;
        String fileType = "pdf";
        String startDate = "2023-01-01";
        String endDate = "2023-12-31";
        File file = new File();
        User user = new User();
        user.setId(1);
        file.setUser(user);
        file.setUploadedAt(LocalDate.now());
        List<File> mockFiles = Arrays.asList(file);

        when(fileRepository.findByUserIdAndTypeAndUploadedAtBetween(anyInt(), anyString(), any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(mockFiles);

        FileResponse fileResponse = fileService.getFiles(userId, fileType, startDate, endDate);

        assertEquals(mockFiles.size(), fileResponse.getFiles().size());
        verify(fileRepository, times(1)).findByUserIdAndTypeAndUploadedAtBetween(anyInt(), anyString(), any(LocalDate.class), any(LocalDate.class));
    }

    @Test
    void getFilesEmptyDate() throws FilesFetchException {
        int userId = 1;
        String fileType = "pdf";
        String startDate = null;
        String endDate = null;
        File file = new File();
        User user = new User();
        user.setId(1);
        file.setUser(user);
        file.setUploadedAt(LocalDate.now());
        List<File> mockFiles = Arrays.asList(file);

        when(fileRepository.findByUserIdAndType(anyInt(), anyString()))
                .thenReturn(mockFiles);

        FileResponse fileResponse = fileService.getFiles(userId, fileType, startDate, endDate);

        assertEquals(mockFiles.size(), fileResponse.getFiles().size());
        verify(fileRepository, times(1)).findByUserIdAndType(anyInt(), anyString());
    }

    @Test
    void getFilesNoFiletype() throws FilesFetchException {
        int userId = 1;
        String fileType = null;
        String startDate = "2023-01-01";
        String endDate = "2023-12-31";
        File file = new File();
        User user = new User();
        user.setId(1);
        file.setUser(user);
        file.setUploadedAt(LocalDate.now());
        List<File> mockFiles = Arrays.asList(file);

        when(fileRepository.findByUserIdAndUploadedAtBetween(anyInt(), any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(mockFiles);

        FileResponse fileResponse = fileService.getFiles(userId, fileType, startDate, endDate);

        assertEquals(mockFiles.size(), fileResponse.getFiles().size());
        verify(fileRepository, times(1)).findByUserIdAndUploadedAtBetween(
                anyInt(), any(LocalDate.class), any(LocalDate.class));
    }

    @Test
    void getFilesOnlyUserid() throws FilesFetchException {
        int userId = 1;
        String fileType = null;
        String startDate = null;
        String endDate = null;
        File file = new File();
        User user = new User();
        user.setId(1);
        file.setUser(user);
        file.setUploadedAt(LocalDate.now());
        List<File> mockFiles = Arrays.asList(file);

        when(fileRepository.findByUserId(anyInt()))
                .thenReturn(mockFiles);

        FileResponse fileResponse = fileService.getFiles(userId, fileType, startDate, endDate);

        assertEquals(mockFiles.size(), fileResponse.getFiles().size());
        verify(fileRepository, times(1)).findByUserId(
                anyInt());
    }

    @Test
    void getFiles_InvalidDate_ThrowsException() {
        int userId = 1;
        String fileType = "pdf";
        String startDate = "invalidDate";
        String endDate = "2023-01-01";

        assertThrows(FilesFetchException.class, () -> fileService.getFiles(userId, fileType, startDate, endDate));
    }

    @Test
    void saveFile_Success() throws FilePersistException, PDFParseException {
        // Arrange
        int userId = 1;
        MultipartFile mockMultipartFile = new MockMultipartFile("file", "example.pdf", "application/pdf", "filecontent".getBytes());
        String filename = "example.pdf";
        User mockUser = new User();
        when(pdfUtils.getText(any(byte[].class))).thenReturn("Sample content");
        when(userRepository.findById(anyInt())).thenReturn(Optional.of(mockUser));
        when(fileDataRepository.save(any(FileData.class))).thenReturn(new FileData());

        FileChangeResponse fileChangeResponse = fileService.saveFile(userId, mockMultipartFile, filename);

        assertEquals("File has been uploaded successfully", fileChangeResponse.getMessage());
        verify(fileRepository, times(1)).save(any(File.class));
    }

    @Test
    void saveFileNoUserFound() throws FilePersistException {
        int userId = 1;
        MultipartFile mockFile = mock(MultipartFile.class);
        String filename = "example.pdf";
        when(userRepository.findById(anyInt())).thenReturn(Optional.empty());

        FileChangeResponse fileChangeResponse = fileService.saveFile(userId, mockFile, filename);

        assertEquals("No user was found for the given id", fileChangeResponse.getMessage());
    }

    @Test
    void updateFile_Success() throws FileUpdateException {
        int userId = 1;
        String fileName = "example.pdf";
        MultipartFile mockMultipartFile = new MockMultipartFile("file", "example.pdf", "application/pdf", "filecontent".getBytes());
        File mockFile = new File();
        when(fileRepository.findByNameAndUserId(anyString(), anyInt())).thenReturn(mockFile);

        FileChangeResponse fileChangeResponse = fileService.updateFile(userId, fileName, mockMultipartFile);

        assertEquals("File has been updated successfully", fileChangeResponse.getMessage());
        verify(fileRepository, times(1)).save(any(File.class));
    }

    @Test
    void updateFileException() throws FileUpdateException {
        int userId = 1;
        String fileName = "example.pdf";
        File mockFile = null;
        MultipartFile mockMultipartFile = new MockMultipartFile("file", "example.pdf", "application/pdf", "filecontent".getBytes());
        when(fileRepository.findByNameAndUserId(anyString(), anyInt())).thenReturn(mockFile);

        assertThrows(FileUpdateException.class, () -> fileService.updateFile(userId, fileName, mockMultipartFile));
    }

    @Test
    void getFileResource_ValidFile_ReturnsOkResponse() throws Exception {
        Integer userId = 1;
        String fileName = "example.pdf";
        Path filePath = Path.of("uploads/" + userId + DELIMITER + fileName);
        URI uri = new URI("file://" + filePath.toString());

        ResponseEntity<Resource> response = fileService.getFileResource(fileName, userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(MediaType.parseMediaType(APPLICATION_PDF), response.getHeaders().getContentType());
        assertNotNull(response.getBody());
    }

    @Test
    void getFileResource_InvalidFile_ThrowsFileNotFoundException() {
        Integer userId = 1;
        String fileName = "nonexistent.pdf";

        assertThrows(FileNotFoundException.class, () -> fileService.getFileResource(fileName, userId));

    }
}
