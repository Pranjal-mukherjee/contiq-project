package api.contiq.notification.controller;

import api.contiq.notification.dto.NotificationDto;
import api.contiq.notification.service.NotificationService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

public class NotificationControllerTest {
    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private NotificationController notificationController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveNotification_ReturnNotificationDTO() {
        NotificationDto notificationDTO = new NotificationDto();
        when(notificationService.saveNotification(notificationDTO)).thenReturn(notificationDTO);

        NotificationDto response = notificationController.saveNotifications(notificationDTO);

        Assertions.assertEquals(notificationDTO, response);
        verify(notificationService, times(1)).saveNotification(notificationDTO);
    }


    @Test
    void testGetAllNotifications_ReturnsListOfNotificationDTOs() {
        List<NotificationDto> expectedNotificationDTOs = new ArrayList<>();
        when(notificationService.getAllNotifications()).thenReturn(expectedNotificationDTOs);

        List<NotificationDto> result = notificationController.getAllNotifications();

        Assertions.assertEquals(expectedNotificationDTOs, result);
        verify(notificationService, times(1)).getAllNotifications();
    }
}
