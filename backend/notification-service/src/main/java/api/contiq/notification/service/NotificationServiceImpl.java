package api.contiq.notification.service;

import api.contiq.notification.dto.NotificationDto;
import api.contiq.notification.entity.NotificationEntity;
import api.contiq.notification.exception.ServiceException;
import api.contiq.notification.mapper.NotificationMapper;
import api.contiq.notification.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {
    private NotificationRepository notificationRepository;
    private NotificationMapper notificationMapper;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository, NotificationMapper notificationMapper) {
        this.notificationRepository = notificationRepository;
        this.notificationMapper = notificationMapper;
    }


    @Override
    public List<NotificationDto> getAllNotifications() {
        try {
            List<NotificationEntity> notificationEntityList = notificationRepository.findAll();
            return notificationEntityList.stream()
                    .map(notificationMapper::convertToNotificationDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ServiceException("Exception in getting all notifications");
        }

    }

    @Override
    public NotificationDto saveNotification(NotificationDto notificationDto) {

            return notificationMapper.
                    convertToNotificationDTO(notificationRepository.
                            save(notificationMapper.convertToNotification(notificationDto)));

    }
}
