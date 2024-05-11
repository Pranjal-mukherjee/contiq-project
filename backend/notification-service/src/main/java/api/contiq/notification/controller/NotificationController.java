package api.contiq.notification.controller;

import api.contiq.notification.dto.NotificationDto;
import api.contiq.notification.service.NotificationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/notifications")
public class NotificationController {
    private NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<NotificationDto> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @PostMapping
    public NotificationDto saveNotifications(@Valid @RequestBody NotificationDto notificationDto) {
        return notificationService.saveNotification(notificationDto);
    }
}
