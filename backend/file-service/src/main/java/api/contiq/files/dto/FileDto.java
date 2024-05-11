package api.contiq.files.dto;

import lombok.Data;

@Data
public class FileDto {
    private Integer fileId;
    private String googleFileId;
    private String fileName;
    private String filePath;
    private String uploadedAt;
    private String fileType;
    private Integer userId;
}
