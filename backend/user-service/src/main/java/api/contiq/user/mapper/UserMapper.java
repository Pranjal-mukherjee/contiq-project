package api.contiq.user.mapper;

import api.contiq.user.dto.UserDTO;
import api.contiq.user.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    private final ModelMapper modelMapper;

    @Autowired
    public UserMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public UserDTO convertToUserDTO(User user) {
        try {
            return modelMapper.map(user, UserDTO.class);
        } catch (NullPointerException exception) {
            throw new NullPointerException("NullPointerException in converting to dto");
        }
    }

    public User convertToUser(UserDTO userDto) {
        try {
            return modelMapper.map(userDto, User.class);
        } catch (NullPointerException exception) {
            throw new NullPointerException("NullPointerException in converting to entity");
        }
    }
}
