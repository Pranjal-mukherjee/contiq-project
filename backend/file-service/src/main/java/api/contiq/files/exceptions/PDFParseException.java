package api.contiq.files.exceptions;

public class PDFParseException extends Exception {

    public PDFParseException() {
    }

    public PDFParseException(String msg) {
        super("Exception while Parsing the PDF File text: " + msg);
    }
}