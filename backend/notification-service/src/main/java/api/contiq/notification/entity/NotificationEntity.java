package api.contiq.notification.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "notification")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "created_at")

    private String createdAt;

    @Column(name = "user_id")
    private int userId;
    @Column(name = "is_read")
    private boolean isRead;
    @Column(name = "message")
    private String notificationMessage;
}
