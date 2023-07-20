package com.codeassembly.community.controller;

import com.amazonaws.Response;
import com.codeassembly.auth.JwtTokenizer;
import com.codeassembly.community.dto.CommunityDto;
import com.codeassembly.community.entity.Community;
import com.codeassembly.community.mapper.CommunityMapper;
import com.codeassembly.community.repository.CommunityRepository;
import com.codeassembly.community.service.CommunityService;
import com.codeassembly.response.MultiResponseDto;
import com.codeassembly.response.SingleResponseDto;
import com.codeassembly.user.dto.UserDto;
import com.codeassembly.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/community")
public class CommunityController {
    private CommunityService communityService;
    private CommunityMapper mapper;
    private final JwtTokenizer jwtTokenizer;

    public CommunityController(CommunityService communityService, CommunityMapper mapper, JwtTokenizer jwtTokenizer) {
        this.communityService = communityService;
        this.mapper = mapper;
        this.jwtTokenizer = jwtTokenizer;
    }

    @PostMapping("/registration/{userId}")
    public ResponseEntity postCommunity(@PathVariable("userId") Long userId,
                                          @Valid @RequestBody CommunityDto.Post requestBody,
                                          @RequestHeader("Authorization") String token) {

        String getToken = jwtTokenizer.getUsername(token);

        Community community =mapper.communityPostDtoToCommunity(requestBody);
        Community createdCommunity =communityService.createdCommunity(userId, community);
        CommunityDto.Response response = mapper.communityToResponseDto(createdCommunity);
        response.setUserInfo(new CommunityDto.UserInfo(createdCommunity.getUser())); // userInfo 설정

        // 토큰 정보를 응답에 포함시킴
        Map<String, Object> responseCreate = new HashMap<>();
        responseCreate.put("token", getToken);
        responseCreate.put("data", response);

        return new ResponseEntity<>(responseCreate, HttpStatus.CREATED);
    }
    @PatchMapping("/edit/{communityId}")
    public ResponseEntity patchCommunity(@PathVariable("communityId") Long communityId,
                                          @Valid @RequestBody CommunityDto.Patch requestBody,
                                          @RequestHeader("Authorization") String token) {

        String getToken = jwtTokenizer.getUsername(token);

        Community community = mapper.communityPatchDtoToCommunity(requestBody);
        Community updateCommunity = communityService.updateCommunity(communityId, community, getToken);
        CommunityDto.Response response = mapper.communityToResponseDto(updateCommunity);

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }
    @DeleteMapping("/{communityId}")
    public ResponseEntity deleteCommunity(@PathVariable("communityId") Long communityId,
                                          @RequestHeader("Authorization") String token)  {

        String getToken = jwtTokenizer.getUsername(token);

        Community deletedCommunity = communityService.deleteCommunity(communityId);

        // 토큰 정보를 응답에 포함시킴
        Map<String, Object> responseDelete= new HashMap<>();
        responseDelete.put("token", getToken);
        responseDelete.put("data", deletedCommunity);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/detail/{communityId}")
    public ResponseEntity getCommunity(@PathVariable("communityId") Long communityId) {

        Community community =communityService.findCommunity(communityId);
        return new ResponseEntity<>(mapper.communityToResponseDto(community),HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity getCommunities(@Positive @RequestParam(defaultValue = "1") int page,
                                         @Positive @RequestParam(defaultValue = "10") int size) {

        Page<Community> pageCommunity = communityService.findCommunities(page-1,size);
        List<Community> communities = pageCommunity.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.communitiesToResponseDtos(communities), pageCommunity), HttpStatus.OK);
    }

    @GetMapping("/{category}")
    public ResponseEntity getCommunitiesByCategoryAndPage(
            @PathVariable("category") String category,
            @Positive @RequestParam(defaultValue = "1") int page,
            @Positive @RequestParam(defaultValue = "10") int size) {

        Page<Community> pageCommunity = communityService.findCommunitiesByCategory(category, page - 1, size);
        List<Community> communities = pageCommunity.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.communitiesToResponseDtos(communities), pageCommunity), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity searchCommunities(@RequestParam("query") String query,
                                            @Positive @RequestParam(defaultValue = "1") int page,
                                            @Positive @RequestParam(defaultValue = "10") int size) {

        Page<Community> pageCommunity = communityService.searchCommunities(query, page - 1, size);
        List<Community> communities = pageCommunity.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.communitiesToResponseDtos(communities), pageCommunity), HttpStatus.OK);
    }


    @PostMapping("/like/{communityId}")
    public ResponseEntity likeCommunity(@PathVariable("communityId") Long communityId,
                                        @RequestHeader("Authorization") String token) {

        String getToken = jwtTokenizer.getUsername(token);

        String likedCommunity = communityService.likeCommunity(communityId);

        // 토큰 정보를 응답에 포함시킴
        Map<String, Object> responseLike = new HashMap<>();
        responseLike.put("token", getToken);
        responseLike.put("data", likedCommunity);

        return new ResponseEntity<>(responseLike, HttpStatus.OK);
    }
}