package api.contiq.files.utils;

import api.contiq.files.dto.FileDataDto;
import api.contiq.files.dto.FileMetaDataRequestDto;
import api.contiq.files.entities.File;
import api.contiq.files.entities.FileData;
import api.contiq.files.entities.User;
import api.contiq.files.exceptions.PDFParseException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;

@Component
@Slf4j
public class FileDataUtils {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PDFUtils pdfUtils;

    public static void  populateFileEntity(File file, FileMetaDataRequestDto metadata, User user) throws IOException {
        log.info("inside populate file");
        file.setUser(user);
        file.setName(metadata.getFileName());
        file.setType(metadata.getFileType());
        file.setUploadedAt(LocalDate.now());
        file.setGoogleFileId(metadata.getFileId());
    }

    public FileData mapFileDtoToElasticFile(FileDataDto fileDTO) {

        return modelMapper.map(fileDTO, FileData.class);
    }
    public static String sanitizeFileName(String fileName){
        return fileName.replaceAll("[^a-zA-Z0-9_\\-\\.]", "");
    }

    public FileDataDto convertElasticFileToDto(FileData file) {
        return modelMapper.map(file, FileDataDto.class);
    }
}