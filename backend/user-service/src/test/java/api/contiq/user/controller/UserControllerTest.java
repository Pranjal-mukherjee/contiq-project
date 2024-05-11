package api.contiq.user.controller;

import api.contiq.user.dto.Auth;
import api.contiq.user.dto.UserDTO;
import api.contiq.user.service.JWTService;
import api.contiq.user.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;


public class UserControllerTest {
    @Mock
    private UserService userService;
    @Mock
    private JWTService jwtService;
    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetByEmail_WithValidEmail_ReturnsUserDTO() {
        String email = "pr@gmail.com";
        UserDTO userDTO = new UserDTO(1, "Pranjal", email, "Pra@1234", 2);
        when(userService.findByEmail(email)).thenReturn(userDTO);
        UserDTO response = userController.findUserByEmail(email);
        Assertions.assertEquals(response, userDTO);
    }

    @Test
    void testSaveUser_ReturnsCreatedUserDTO() {
        UserDTO userDTO = new UserDTO(1, "Pranjal", "pr@gmail.com", "Test@123", 2);

        when(userService.saveUser(userDTO)).thenReturn(userDTO);

        UserDTO user = userController.saveUser(userDTO);
        assertEquals(userDTO, user);
    }

    @Test
    void testCreateNewPassword_ReturnsNewUserDTO() {
        UserDTO userDTO = new UserDTO(1, "Pranjal", "pr@gmail.com", "Test@123", 2);
        Map<String,String> update = new HashMap<>();
        update.put("password","Pra@1234");
        UserDTO newUserDTO = new UserDTO(1, "Pranjal", "pr@gmail.com", "Pra@1234", 2);
        when(userService.updateUser("pr@gmail.com", update)).thenReturn(newUserDTO);
        UserDTO userDTO1 = userController.updateUser("pr@gmail.com", update);
        Assertions.assertNotEquals(userDTO1, userDTO);

    }

    @Test
    void testUpdateNotificationCount_ReturnsUpdatedUserDTO() {
        int userId = 1;
        Map<String, Integer> updates = new HashMap<>();
        updates.put("notificationCount", 1);

        UserDTO updatedUserDTO = new UserDTO(userId, "Pranjal", "pr@gmail.com", "Test@123", 1);

        when(userService.updateOnNotificationClick(userId, updates)).thenReturn(updatedUserDTO);

        UserDTO response = userController.updateNotificationForUser(userId, updates);


        assertEquals(updatedUserDTO, response);
    }

    @Test
    void testGetTokenWithAuthNull() {
        Auth authRequest = new Auth();
        when(jwtService.generateToken(authRequest.getEmail(), authRequest.getPassword())).thenReturn("unable to generate token");
        assertEquals("unable to generate token", userController.getToken(authRequest));
    }

    @Test
    void testGetTokenWithAuth() {
        String expectedToken = "validToken";
        Auth authRequest = new Auth("test@gmail.com", "test@123");
        when(jwtService.generateToken(authRequest.getEmail(), authRequest.getPassword())).thenReturn(expectedToken);
        assertEquals(expectedToken, userController.getToken(authRequest));
    }

    @Test
    void testGetTokenWithAuthPasswordNull() {
        Auth authRequest = new Auth("test@gmail.com", null);
        when(jwtService.generateToken(authRequest.getEmail(), authRequest.getPassword())).thenReturn("unable to generate token");
        assertEquals("unable to generate token", userController.getToken(authRequest));
    }
}
