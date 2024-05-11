package api.contiq.files.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class FileResponse {
    private List<FileDto> files = new ArrayList<>();
}
