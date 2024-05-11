package api.contiq.files.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;

@Document(indexName = "filedata")
@Data
public class FileData {

    @Id
    @Field(type = FieldType.Text)
    private String id;

    @Field(type = FieldType.Text, name = "userid")
    private Integer userId;

    @Field(type = FieldType.Text, name = "filename")
    private String fileName;

    @Field(type = FieldType.Text, name = "filecontent")
    private String fileContent;

    @Field(type = FieldType.Date)
    private Date createdAt;

}