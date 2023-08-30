package com.codeassembly.community.mapper;

import com.codeassembly.community.dto.CommunityDto;
import com.codeassembly.community.entity.Community;
import com.codeassembly.community.entity.CommunityUploadFile;
import com.codeassembly.s3.dto.S3FileDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommunityMapper {
    Community communityPostDtoToCommunity(CommunityDto.Post requestBody);
    CommunityDto.Response communityToResponseDto(Community createdCommunity);
    Community communityPatchDtoToCommunity(CommunityDto.Patch requestBody);
    List<CommunityDto.Response> communitiesToResponseDtos(List<Community> communities);

    CommunityUploadFile s3FileDtoToCommunityUploadFile(S3FileDto url);
}
