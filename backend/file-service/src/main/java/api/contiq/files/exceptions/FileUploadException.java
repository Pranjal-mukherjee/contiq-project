package api.contiq.files.exceptions;

public class FileUploadException extends Exception {

    public FileUploadException() {
    }

    public FileUploadException(String msg) {
        super("Exception while Uploading the file: " + msg);
    }
}