package com.codeassembly.user.mapper;


import com.codeassembly.user.dto.LoginResponseDto;
import com.codeassembly.user.dto.UserDto;
import com.codeassembly.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
//@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    User userDtoPostTOUser(UserDto.Post requestBody);
    User userDtoPatchTOUser(UserDto.Patch requestBody);
    UserDto.Response userTOUserDTOResponse(User user);
    List<UserDto.Response> usersToUserDtoResponse(List<User> users);
    LoginResponseDto loginToLoginResponseDto(User user);

}
