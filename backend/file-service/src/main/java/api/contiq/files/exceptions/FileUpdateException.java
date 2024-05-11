package api.contiq.files.exceptions;

public class FileUpdateException extends Exception {

    public FileUpdateException() {
    }

    public FileUpdateException(String msg) {
        super("Exception while updating the file: " + msg);
    }
}