package api.contiq.user.service;

import api.contiq.user.dto.UserDTO;
import api.contiq.user.entity.User;

import java.util.Map;

public interface UserService {
    public UserDTO findByEmail(String email);

    public UserDTO saveUser(UserDTO userDTO);

    public UserDTO updateUser(String email, Map<String, String> password);

    public UserDTO updateOnNotificationClick(int id, Map<String, Integer> userUpdates);

    public User findByEmailAndPassword(String email, String password);
}
