package com.codeassembly.community.controller;

import com.codeassembly.auth.JwtTokenizer;
import com.codeassembly.community.dto.CommunityDto;
import com.codeassembly.community.entity.Community;
import com.codeassembly.community.mapper.CommunityMapper;
import com.codeassembly.community.service.CommunityService;
import com.codeassembly.response.MultiResponseDto;
import com.codeassembly.response.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/community")
public class CommunityController {
    private final CommunityService communityService;
    private final CommunityMapper mapper;
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
        CommunityDto.Response response = mapper.communityToResponseDto(community);
        response.setUserInfo(new CommunityDto.UserInfo(community.getUser()));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity getCommunities(@Positive @RequestParam(defaultValue = "1") int page,
                                         @Positive @RequestParam(defaultValue = "10") int size) {

        Page<Community> pageCommunity = communityService.findCommunities(page - 1, size);
        List<Community> communities = pageCommunity.getContent();
        List<CommunityDto.Response> responses = new ArrayList<>();

        for (Community community : communities) {
            // community 객체에서 user 정보를 가져와서 userInfo를 설정
            CommunityDto.UserInfo userInfo = new CommunityDto.UserInfo(community.getUser());
            responses.add(new CommunityDto.Response(community, userInfo));
        }

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageCommunity), HttpStatus.OK);
    }

    @GetMapping("/{category}")
    public ResponseEntity getCommunitiesByCategoryAndPage(
            @PathVariable("category") String category,
            @Positive @RequestParam(defaultValue = "1") int page,
            @Positive @RequestParam(defaultValue = "10") int size) {

        Page<Community> pageCommunity = communityService.findCommunitiesByCategory(category, page - 1, size);
        List<Community> communities = pageCommunity.getContent();
        List<CommunityDto.Response> responses = new ArrayList<>();

        for (Community community : communities) {
            // community 객체에서 user 정보를 가져와서 userInfo를 설정
            CommunityDto.UserInfo userInfo = new CommunityDto.UserInfo(community.getUser());
            responses.add(new CommunityDto.Response(community, userInfo));
        }

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageCommunity), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity searchCommunities(@RequestParam("query") String query,
                                            @Positive @RequestParam(defaultValue = "1") int page,
                                            @Positive @RequestParam(defaultValue = "10") int size) {

        Page<Community> pageCommunity = communityService.searchCommunities(query, page - 1, size);
        List<Community> communities = pageCommunity.getContent();
        List<CommunityDto.Response> responses = new ArrayList<>();

        for (Community community : communities) {
            // community 객체에서 user 정보를 가져와서 userInfo를 설정
            CommunityDto.UserInfo userInfo = new CommunityDto.UserInfo(community.getUser());
            responses.add(new CommunityDto.Response(community, userInfo));
        }

        return new ResponseEntity<>(new MultiResponseDto<>(responses, pageCommunity), HttpStatus.OK);
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