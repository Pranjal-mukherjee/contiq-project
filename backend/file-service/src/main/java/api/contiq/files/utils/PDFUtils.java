package api.contiq.files.utils;

import api.contiq.files.exceptions.PDFParseException;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class PDFUtils {
   public String getText(byte[] pdfData) throws PDFParseException {
        try (PDDocument document = PDDocument.load(pdfData)) {
            PDFTextStripper pdfTextStripper = new PDFTextStripper();
            return pdfTextStripper.getText(document);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new PDFParseException(e.getMessage());
        }
   }
}