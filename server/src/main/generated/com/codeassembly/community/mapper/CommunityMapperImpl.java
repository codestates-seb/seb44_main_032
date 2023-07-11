package com.codeassembly.community.mapper;

import com.codeassembly.community.dto.CommunityDto.Patch;
import com.codeassembly.community.dto.CommunityDto.Post;
import com.codeassembly.community.dto.CommunityDto.Response;
import com.codeassembly.community.entity.Community;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-04T18:01:36+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class CommunityMapperImpl implements CommunityMapper {

    @Override
    public Community communityPostDtoToCommunity(Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Community community = new Community();

        community.setTitle( requestBody.getTitle() );
        community.setBody( requestBody.getBody() );

        return community;
    }

    @Override
    public Response communityToResponseDto(Community createdCommunity) {
        if ( createdCommunity == null ) {
            return null;
        }

        Response response = new Response();

        response.setCommunityId( createdCommunity.getCommunityId() );
        response.setTitle( createdCommunity.getTitle() );
        response.setBody( createdCommunity.getBody() );
        response.setCreatedAt( createdCommunity.getCreatedAt() );
        response.setUpdatedAt( createdCommunity.getUpdatedAt() );

        return response;
    }

    @Override
    public Community communityPatchDtoToCommunity(Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Community community = new Community();

        community.setCommunityId( requestBody.getCommunityId() );
        community.setTitle( requestBody.getTitle() );
        community.setBody( requestBody.getBody() );

        return community;
    }

    @Override
    public List<Response> communitiesToResponseDtos(List<Community> communities) {
        if ( communities == null ) {
            return null;
        }

        List<Response> list = new ArrayList<Response>( communities.size() );
        for ( Community community : communities ) {
            list.add( communityToResponseDto( community ) );
        }

        return list;
    }
}
