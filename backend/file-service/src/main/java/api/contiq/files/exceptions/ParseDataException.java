package api.contiq.files.exceptions;

public class ParseDataException extends RuntimeException {
    public static final String PARSE_DATA_ERROR = "Error occurred while parsing the data for file : %s";
    public ParseDataException(String fileName) {
        super(String.format(PARSE_DATA_ERROR, fileName));
    }

}
