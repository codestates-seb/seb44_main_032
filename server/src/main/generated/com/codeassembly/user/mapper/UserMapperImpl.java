package com.codeassembly.user.mapper;

import com.codeassembly.user.dto.UserDto.Patch;
import com.codeassembly.user.dto.UserDto.Post;
import com.codeassembly.user.dto.UserDto.Response;
import com.codeassembly.user.userEntity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-04T18:01:36+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userPostDtoToUser(Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        User user = new User();

        user.setNickName( requestBody.getNickName() );
        user.setEmail( requestBody.getEmail() );
        user.setPassword( requestBody.getPassword() );

        return user;
    }

    @Override
    public Response userToResponseDto(User user) {
        if ( user == null ) {
            return null;
        }

        Response response = new Response();

        return response;
    }

    @Override
    public User userPatchDtoToUser(Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        User user = new User();

        user.setNickName( requestBody.getNickName() );
        user.setPassword( requestBody.getPassword() );
        user.setUserStatus( requestBody.getUserStatus() );

        return user;
    }
}
