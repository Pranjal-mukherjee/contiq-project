package api.contiq.user.controller;

import api.contiq.user.dto.Auth;
import api.contiq.user.dto.UserDTO;
import api.contiq.user.service.JWTService;
import api.contiq.user.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/v1/users")
@Slf4j
public class UserController {
    private UserService userService;
    private JWTService jwtService;

    @Autowired

    public UserController(UserService userService, JWTService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }


    @GetMapping
    public UserDTO findUserByEmail(@RequestParam("email") String email) {
        return userService.findByEmail(email);
    }

    @PostMapping("/signup")
    public UserDTO saveUser(@Valid @RequestBody UserDTO userDTO) {
        return userService.saveUser(userDTO);
    }

    @PatchMapping("/reset-password")
    public UserDTO updateUser(@RequestParam("email") String email, @Valid @RequestBody Map<String, String> newPassword) {
        return userService.updateUser(email, newPassword);

    }

    @PatchMapping("/{id}")
    public UserDTO updateNotificationForUser(@PathVariable int id, @Valid @RequestBody Map<String, Integer> userUpdates) {
        return userService.updateOnNotificationClick(id, userUpdates);
    }

    @PostMapping("/login")
    public String getToken(@Valid @RequestBody Auth auth) {
        if (auth.getEmail() != null && auth.getPassword() != null) {
            if (userService.findByEmailAndPassword(auth.getEmail(), auth.getPassword()) == null) {
                UserDTO user = new UserDTO();
                user.setEmail(auth.getEmail());
                user.setPassword(auth.getPassword());
                saveUser(user);
            }
            return jwtService.generateToken(auth.getEmail(), auth.getPassword());
        } else
            return "unable to generate token";
    }


}
