package api.contiq.user.service;

import api.contiq.user.dto.UserDTO;
import api.contiq.user.entity.User;
import api.contiq.user.exception.UserNotFound;
import api.contiq.user.mapper.UserMapper;
import api.contiq.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    public UserMapper userMapper;
    public UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserMapper userMapper, UserRepository userRepository) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;

    }

    @Override
    public UserDTO findByEmail(String email) {

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            User userEntity = user.get();
            return userMapper.convertToUserDTO(userEntity);
        } else {
            throw new UserNotFound("User with email not found: " + email);
        }


    }


    @Override
    public UserDTO saveUser(UserDTO userDTO) {
        return userMapper.convertToUserDTO(userRepository.save(userMapper.convertToUser(userDTO)));
    }

    @Override
    public UserDTO updateUser(String email, Map<String,String> password) {

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && password.containsKey("password")) {
            User userEntity = user.get();
            String updatedPassword = password.get("password");
            userEntity.setPassword(updatedPassword);
            return userMapper.convertToUserDTO(userRepository.save(userEntity));
        } else {
            throw new UserNotFound("User with email not found: " + email);
        }

    }


    @Override
    public UserDTO updateOnNotificationClick(int id, Map<String, Integer> userUpdates) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFound("User not found with this id : " + id));
        if (userUpdates.containsKey("notificationCount")) {
            int newNotificationCount = userUpdates.get("notificationCount");
            user.setNotificationCount(newNotificationCount);
        } else {
            throw new IllegalArgumentException("Argument not valid");
        }

        return userMapper.convertToUserDTO(userRepository.save(user));
    }

    @Override
    public User findByEmailAndPassword(String email, String password) throws UserNotFound {
        Optional<User> user = userRepository.findByEmailAndPassword(email, password);
        if (user.isEmpty()) {
            throw new UserNotFound("Invalid email and password");
        }
        return user.get();
    }
}
