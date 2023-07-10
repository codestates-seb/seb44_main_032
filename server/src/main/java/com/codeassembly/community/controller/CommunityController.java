package com.codeassembly.community.controller;

import com.codeassembly.community.dto.CommunityDto;
import com.codeassembly.community.entity.Community;
import com.codeassembly.community.mapper.CommunityMapper;
import com.codeassembly.community.service.CommunityService;
import com.codeassembly.response.MultiResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Controller
@RequestMapping("/community")
public class CommunityController {
    private CommunityService communityService;
    private CommunityMapper mapper;

    public CommunityController(CommunityService communityService, CommunityMapper mapper){
        this.communityService = communityService;
        this.mapper = mapper;
    }
    @PostMapping("/registration/{userId}")
    public ResponseEntity createCommunity(@PathVariable("userId") Long userId,
                                          @Valid @RequestBody CommunityDto.Post requestBody
                                          ){
        Community community =mapper.communityPostDtoToCommunity(requestBody);
        Community createdCommunity =communityService.createdCommunity(userId, community);
        CommunityDto.Response response = mapper.communityToResponseDto(createdCommunity);
        response.setUserInfo(new CommunityDto.UserInfo(createdCommunity.getUser())); // userInfo 설정
        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }
    @PatchMapping("/edit/{userId}")
    public ResponseEntity updateCommunity(@PathVariable("userId") Long userId,
                                         @Valid @RequestBody CommunityDto.Patch requestBody){
        Community community = mapper.communityPatchDtoToCommunity(requestBody);
        Community updateCommunity = communityService.updateCommunity(userId, community);
        return new ResponseEntity<>(mapper.communityToResponseDto(updateCommunity), HttpStatus.OK);
    }
    @DeleteMapping("/{communityId}")
    public ResponseEntity deleteCommunity(@PathVariable("communityId") Long communityId){
        communityService.deleteCommunity(communityId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("{communityId}")
    public ResponseEntity getCommunity(@PathVariable("communityId") Long communityId){
        Community community =communityService.findCommunity(communityId);
        return new ResponseEntity<>(mapper.communityToResponseDto(community),HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getCommunities(@Positive @RequestParam(defaultValue = "1") int page,
                                         @Positive @RequestParam(defaultValue = "6") int size){
        Page<Community> pageCommunity = communityService.findCommunities(page-1,size);
        List<Community> communities = pageCommunity.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.communitiesToResponseDtos(communities), pageCommunity), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity searchCommunities(@RequestParam("query") String query,
                                            @Positive @RequestParam(defaultValue = "1") int page,
                                            @Positive @RequestParam(defaultValue = "6") int size) {
        Page<Community> pageCommunity = communityService.searchCommunities(query, page - 1, size);
        List<Community> communities = pageCommunity.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.communitiesToResponseDtos(communities), pageCommunity), HttpStatus.OK);
    }
}