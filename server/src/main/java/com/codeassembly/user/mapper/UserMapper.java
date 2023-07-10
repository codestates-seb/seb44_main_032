package com.codeassembly.user.mapper;

import com.codeassembly.user.dto.UserDto;
import com.codeassembly.user.userEntity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userPostDtoToUser(UserDto.Post requestBody);

    UserDto.Response userToResponseDto(User user);

    User userPatchDtoToUser(UserDto.Patch requestBody);
}
