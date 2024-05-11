package api.contiq.notification.service;

import api.contiq.notification.dto.NotificationDto;
import api.contiq.notification.entity.NotificationEntity;
import api.contiq.notification.exception.ServiceException;
import api.contiq.notification.mapper.NotificationMapper;
import api.contiq.notification.repository.NotificationRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class NotificationServiceTest {
    @Mock
    private NotificationRepository notificationRepository;

    @InjectMocks
    private NotificationServiceImpl notificationService;
    @Mock
    private NotificationMapper notificationMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllNotification_When_Clicked_ReturnsAllNotificationList(){
        NotificationEntity notification = new NotificationEntity(1, LocalDateTime.now().toString(), 1, false, "John has uploaded xyz.pdf");
        NotificationEntity notification2 = new NotificationEntity(2, LocalDateTime.now().toString(), 2,
                false, "Dow has uploaded xyz.pdf");
        List<NotificationEntity> notificationEntityList = new ArrayList<>();
        notificationEntityList.add(notification);
        notificationEntityList.add(notification2);
        when(notificationRepository.findAll()).thenReturn(notificationEntityList);
        List<NotificationDto> result = notificationService.getAllNotifications();

        Assertions.assertNotNull(result);
        Assertions.assertEquals(notificationEntityList.size(), result.size());
    }
    @Test
    void getAllNotifications_ExceptionDuringRetrieval_ThrowsServiceException() {
        // Arrange
        when(notificationRepository.findAll()).thenThrow(new ServiceException("Exception during retrieval"));

        // Act & Assert
        assertThrows(ServiceException.class, () -> notificationService.getAllNotifications());
    }
    @Test
    void saveNotification_When_Clicked_Saves_And_Returns_NotificationDTO() throws NullPointerException{
        setUp();
        NotificationDto notificationDto = new NotificationDto(1, LocalDateTime.now().toString(), 1, false, "John has uploaded xyz.pdf");
        NotificationEntity notification = new NotificationEntity(1, LocalDateTime.now().toString(), 1, false, "John has uploaded xyz.pdf");
        when(notificationMapper.convertToNotification(notificationDto)).thenReturn(notification);
        when(notificationRepository.save(notification)).thenReturn(notification);
        when(notificationMapper.convertToNotificationDTO(notification)).thenReturn(notificationDto);
        NotificationDto notificationDTO1 = notificationMapper.convertToNotificationDTO(notificationRepository.save(notification));
        NotificationDto savedNotificationDTO = notificationService.saveNotification(notificationDTO1);
        //verify(notificationRepository, times(1)).save(notification);
        Assertions.assertNotNull(savedNotificationDTO);
        Assertions.assertEquals(notification.getId(), savedNotificationDTO.getId());
        Assertions.assertEquals(notification.getNotificationMessage(), savedNotificationDTO.getMessage());
        Assertions.assertEquals(notification.getUserId(), savedNotificationDTO.getUserId());
    }

}
