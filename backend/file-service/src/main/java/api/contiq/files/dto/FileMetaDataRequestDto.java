package api.contiq.files.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FileMetaDataRequestDto {

    private String fileId;
    private String fileName;
    private String fileType;
    private String filePath;
    private int userId;

}
