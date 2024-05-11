package api.contiq.files.service;

import api.contiq.files.dto.FileChangeResponse;
import api.contiq.files.dto.FileMetaDataRequestDto;
import api.contiq.files.exceptions.FilePersistException;

public interface GoogleService {

    FileChangeResponse saveFileFromGoogleDrive(FileMetaDataRequestDto metadata) throws FilePersistException;
}
