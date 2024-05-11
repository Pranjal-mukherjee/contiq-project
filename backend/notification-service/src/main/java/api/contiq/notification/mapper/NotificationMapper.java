package api.contiq.notification.mapper;

import api.contiq.notification.dto.NotificationDto;
import api.contiq.notification.entity.NotificationEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {
    private final ModelMapper modelMapper;

    @Autowired
    public NotificationMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public NotificationDto convertToNotificationDTO(NotificationEntity notification) {
        try {
            return modelMapper.map(notification, NotificationDto.class);
        } catch (NullPointerException exception) {
            throw new NullPointerException("NullPointerException in converting to dto");
        }
    }

    public NotificationEntity convertToNotification(NotificationDto notificationDto) {
        try {
            return modelMapper.map(notificationDto, NotificationEntity.class);
        } catch (NullPointerException exception) {
            throw new NullPointerException("NullPointerException in converting to entity");
        }
    }
}
