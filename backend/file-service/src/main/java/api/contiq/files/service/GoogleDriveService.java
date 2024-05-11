package api.contiq.files.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;
@Service
@Slf4j
public class GoogleDriveService {
    @Value("${file.storage.base}")
    private static String baseStorageLocation;
    private GoogleDriveService() {
    }
    public static ByteArrayOutputStream downloadFile(String realFileId) throws IOException {
        GoogleCredentials credentials = GoogleCredentials.getApplicationDefault()
                .createScoped(Arrays.asList(DriveScopes.DRIVE));
        HttpRequestInitializer requestInitializer = new HttpCredentialsAdapter(
                credentials);
        Drive service = new Drive.Builder(new NetHttpTransport(),
                GsonFactory.getDefaultInstance(),
                requestInitializer)
                .setApplicationName("BC138-contiq")
                .build();

        OutputStream outputStream = new ByteArrayOutputStream();

        service.files().get(realFileId)
                .executeMediaAndDownloadTo(outputStream);
        return (ByteArrayOutputStream) outputStream;

    }
}
