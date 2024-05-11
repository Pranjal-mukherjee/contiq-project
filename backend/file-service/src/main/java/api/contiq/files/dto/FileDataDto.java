package api.contiq.files.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FileDataDto {

    private String fileId;
    private String fileName;
    private String fileContent;
    private Integer userId;
    private Date createdAt;
    private String filePath;
    private List<String> searchTexts;
}