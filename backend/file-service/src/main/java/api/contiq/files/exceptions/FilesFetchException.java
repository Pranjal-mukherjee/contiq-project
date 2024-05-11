package api.contiq.files.exceptions;

public class FilesFetchException extends Exception {

    public FilesFetchException() {
    }

    public FilesFetchException(String msg) {
        super("Exception while fetching the files from DB: " + msg);
    }
}