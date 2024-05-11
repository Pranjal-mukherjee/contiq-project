package api.contiq.user.service;

import api.contiq.user.dto.UserDTO;
import api.contiq.user.entity.User;
import api.contiq.user.exception.UserNotFound;
import api.contiq.user.mapper.UserMapper;
import api.contiq.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testFindByEmailExistingUser() {

        String email = "test@example.com";
        User userEntity = new User();
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(userEntity));
        when(userMapper.convertToUserDTO(userEntity)).thenReturn(new UserDTO());

        UserDTO userDTO = userService.findByEmail(email);

        assertNotNull(userDTO);
        verify(userRepository, times(1)).findByEmail(email);
        verify(userMapper, times(1)).convertToUserDTO(userEntity);
    }

    @Test
    void testFindByEmailNonExistingUser() {

        String email = "nonexistent@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(UserNotFound.class, () -> userService.findByEmail(email));
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    void testSave_CreatesUser() {
        UserDTO newUserDTO = new UserDTO(3, "New User", "newuser@example.com", "NewPass@123", 0);
        User newUserEntity = new User(3, "New User", "newuser@example.com", "NewPass@123", 0);

        when(userMapper.convertToUser(newUserDTO)).thenReturn(newUserEntity);
        when(userMapper.convertToUserDTO(newUserEntity)).thenReturn(newUserDTO);
        when(userRepository.save(newUserEntity)).thenReturn(newUserEntity);

        UserDTO savedUserDTO = userService.saveUser(newUserDTO);

        assertEquals(newUserDTO, savedUserDTO);
    }

    @Test
    void testUpdateNotificationCount_Success() {
        int userId = 1;
        int newNotificationCount = 10;

        User userEntity = new User();
        userEntity.setId(userId);
        userEntity.setNotificationCount(5);

        Map<String, Integer> userUpdates = new HashMap<>();
        userUpdates.put("notificationCount", newNotificationCount);


        when(userRepository.findById(userId)).thenReturn(Optional.of(userEntity));
        when(userRepository.save(any(User.class))).thenReturn(userEntity);
        UserDTO userDTO = new UserDTO();
        userDTO.setNotificationCount(newNotificationCount);
        when(userMapper.convertToUserDTO(userEntity)).thenReturn(userDTO);

        UserDTO updatedUser = userService.updateOnNotificationClick(userId, userUpdates);

        assertEquals(newNotificationCount, updatedUser.getNotificationCount());
    }

    @Test
    void testUpdateNotificationCount_UserNotFound() {
        int userId = 1;
        Map<String, Integer> userUpdates = new HashMap<>();
        userUpdates.put("notificationCount", 10);

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFound.class, () -> userService.updateOnNotificationClick(userId, userUpdates));
        verify(userRepository).findById(userId);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testGetUserByEmailAndPasswordValid() throws UserNotFound {
        User userEntity = new User();
        userEntity.setEmail("test@example.com");
        userEntity.setPassword("password123");
        when(userRepository.findByEmailAndPassword("test@example.com", "password123"))
                .thenReturn(Optional.of(userEntity));
        User result = userService.findByEmailAndPassword("test@example.com", "password123");
        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
        assertEquals("password123", result.getPassword());
    }

    @Test
    void testGetUserByEmailAndPasswordInvalid() {
        when(userRepository.findByEmailAndPassword("invalid@example.com", "invalidpassword"))
                .thenReturn(Optional.empty());
        assertThrows(UserNotFound.class, () -> userService.findByEmailAndPassword("invalid@example.com", "invalidpassword"));
    }

    @Test
    void testUpdateUser() {
        String email = "test@example.com";
        User userEntity = new User(3, "New User", "newuser@example.com", "NewPass@123", 0);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(userEntity));
        Map<String,String> update = new HashMap<>();
        update.put("password","Pra@1234");
        userEntity.setPassword(update.get("password"));
        User user1 = new User(3, "New User", "newuser@example.com", update.get("password"), 0);
        UserDTO userDTO = new UserDTO(3, "New User", "newuser@example.com", update.get("password"), 0);
        when(userRepository.save(userEntity)).thenReturn(user1);
        when(userMapper.convertToUserDTO(user1)).thenReturn(userDTO);
        assertEquals(update.get("password"), userDTO.getPassword());

    }

    @Test
    void testUpdateUserSuccess() {
        String email = "test@example.com";
        Map<String,String> update = new HashMap<>();
        update.put("password","Pra@1234");
        String newPassword = update.get("password");
        User userEntity = new User(3, "New User", "newuser@example.com", "NewPass@123", 0);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(userEntity));

        User updatedUserEntity = new User(3, "New User", "newuser@example.com", newPassword, 0);
        when(userRepository.save(any(User.class))).thenReturn(updatedUserEntity);

        UserDTO updatedUserDTO = userService.updateUser(email, update);

        assertEquals(newPassword, updatedUserEntity.getPassword());
        verify(userRepository, times(1)).findByEmail(email);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testUpdateUserUserNotFound() {
        String email = "nonexistent@example.com";
        Map<String,String> update = new HashMap<>();
        update.put("password","Pra@1234");

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(UserNotFound.class, () -> userService.updateUser(email, update));
        verify(userRepository, times(1)).findByEmail(email);
        verify(userRepository, never()).save(any(User.class));
    }

}
