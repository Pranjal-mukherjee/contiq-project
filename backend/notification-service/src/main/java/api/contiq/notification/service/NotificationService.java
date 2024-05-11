package api.contiq.notification.service;

import api.contiq.notification.dto.NotificationDto;

import java.util.List;

public interface NotificationService {
    public List<NotificationDto> getAllNotifications();
    public NotificationDto saveNotification(NotificationDto notificationDto);
}
