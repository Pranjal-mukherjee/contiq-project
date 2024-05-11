package api.contiq.notification.dto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationDto {
    private int id;
    private String createdAt;
    private int userId;
    private boolean isRead;
    @NotEmpty
    @Size(min = 10)
    private String message;
}
