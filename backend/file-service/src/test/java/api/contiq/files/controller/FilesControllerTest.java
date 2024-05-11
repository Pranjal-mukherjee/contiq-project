package api.contiq.files.controller;

import api.contiq.files.dto.FileChangeResponse;
import api.contiq.files.dto.FileDataDto;
import api.contiq.files.dto.FileMetaDataRequestDto;
import api.contiq.files.dto.FileResponse;
import api.contiq.files.service.ElasticSearchService;
import api.contiq.files.service.FileService;
import api.contiq.files.service.GoogleService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.json.stream.JsonParsingException;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FilesController.class)
@AutoConfigureMockMvc(addFilters = false)
class FilesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FileService fileService;

    @MockBean
    private ElasticSearchService elasticSearchService;
    @MockBean
    private GoogleService googleService;

    @WithMockUser(value = "spring")
    @Test
    void testGetRecentFiles() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InputStream fileStream = getClass().getResourceAsStream("/getFileResponse.json");
        FileResponse mockFileResponse = mapper.readValue(fileStream, FileResponse.class);
        assert fileStream != null;
        fileStream.close();

        given(fileService.getFiles(anyInt(), any(), any(), any()))
                .willReturn(mockFileResponse);

        ResultActions resultActions = mockMvc.perform(get("/api/v1/files/{userId}", 123))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.files", Matchers.hasSize(mockFileResponse.getFiles().size())));
    }

    @WithMockUser(value = "spring")
    @Test
    void testSaveFile() throws Exception {
        given(fileService.saveFile(anyInt(), any(), anyString()))
                .willReturn(new FileChangeResponse("FILE_SAVED"));

        mockMvc.perform(
                        multipart("/api/v1/files/{userId}", 123)
                                .file("file", "file-content".getBytes())
                                .param("filename", "example.txt")
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @WithMockUser(value = "spring")
    @Test
    void testUpdateFile() throws Exception {
        given(fileService.updateFile(anyInt(), anyString(), any()))
                .willReturn(new FileChangeResponse("FILE_UPDATED"));

        mockMvc.perform(
                        multipart("/api/v1/files/update/{userId}", 123)
                                .file("file", "file-content".getBytes())
                                .param("filename", "example.txt")
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @WithMockUser(value = "spring")
    @Test
    void testSearchFiles() throws Exception {
        FileDataDto dto = new FileDataDto();
        String userId = "1";
        dto.setFileName("file1");
        dto.setFileContent("content1");
        given(elasticSearchService.findBySearchTerm("searchText", userId))
                .willReturn(Collections.singletonList(dto));

        // Act and Assert
        mockMvc.perform(get("/api/v1/files/search/{userId}", userId)
                        .param("text", "searchText"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].fileName").value("file1"))
                .andExpect(jsonPath("$[0].fileContent").value("content1"));
    }

    @WithMockUser(value = "spring")
    @Test
    void testFileUpload() throws Exception {
        MultipartFile mockFile = new MockMultipartFile("test.pdf", new byte[0]);
        Integer userId = 123;
        given(elasticSearchService.uploadFile(mockFile, userId)).willReturn("File uploaded successfully.");

        mockMvc.perform(multipart("/api/v1/files/elastic/upload")
                        .file("file", "file-content".getBytes())
                        .param("userId", "123")
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isOk());
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(content().string("File uploaded successfully."));
    }

    @WithMockUser(value = "spring")
    @Test
    void testGetFileResource() throws Exception {
        Resource mockResource = mock(Resource.class);
        FileDataDto dto = new FileDataDto();
        Integer userId = 1;
        dto.setFileName("file1");
        dto.setFileContent("content1");
        given(fileService.getFileResource("file.pdf", userId))
                .willReturn(ResponseEntity.ok().body(mockResource));

        // Act and Assert
        mockMvc.perform(get("/api/v1/files/resource/{userId}", userId)
                        .param("fileName", "file.pdf"))
                .andExpect(status().isOk());

    }

    @Test
    void testUploadFromDrive() throws Exception {
        // Given
        FileMetaDataRequestDto metadataRequestDto = new FileMetaDataRequestDto();
        ObjectMapper objectMapper = new ObjectMapper();
        metadataRequestDto.setUserId(1);
        metadataRequestDto.setFileId("1SdC4Kq2o7uC1htriWYEY--DqUmIvxXYx");
        metadataRequestDto.setFileName("CyberZemosoCertificate.pdf");
        metadataRequestDto.setFileType("pdf");
        metadataRequestDto.setFilePath("");

        given(googleService.saveFileFromGoogleDrive(any(FileMetaDataRequestDto.class)))
                .willReturn(new FileChangeResponse("FILE_UPLOADED"));

        // Create a MockMultipartFile for the 'metadata' part
        MockMultipartFile metadataPart = new MockMultipartFile(
                "metadata",
                "",
                "application/json",
                objectMapper.writeValueAsString(metadataRequestDto).getBytes()
        );

        // When & Then
        mockMvc.perform(multipart("/api/v1/files/drive")
                        .file(metadataPart)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("FILE_UPLOADED"));
    }

    @WithMockUser(value = "spring")
    @Test
    void testDeleteFile() throws Exception {
        given(elasticSearchService.deleteFileById(anyString()))
                .willReturn("File deleted successfully.");

        mockMvc.perform(delete("/api/v1/files/delete/{id}", "file_id123"))
                .andExpect(status().isOk());
    }

}
