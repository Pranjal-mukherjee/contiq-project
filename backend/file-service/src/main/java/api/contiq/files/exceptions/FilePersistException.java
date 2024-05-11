package api.contiq.files.exceptions;

public class FilePersistException extends Exception {

    public FilePersistException() {
    }

    public FilePersistException(String msg) {
        super("Exception while saving the file: " + msg);
    }
}