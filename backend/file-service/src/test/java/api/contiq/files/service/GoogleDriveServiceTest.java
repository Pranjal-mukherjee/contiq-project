package api.contiq.files.service;

import com.google.api.services.drive.Drive;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class GoogleDriveServiceTest {
    @Mock
    private Drive drive;

    @InjectMocks
    private GoogleDriveService googleDriveService;

    @Test
    void downloadFile_shouldDownloadFile() throws IOException {
        // Arrange
        String fileId = "1SdC4Kq2o7uC1htriWYEY--DqUmIvxXYx";

        // Act
        ByteArrayOutputStream result = GoogleDriveService.downloadFile(fileId);

        // Assert
        assertNotNull(result);

    }
}
