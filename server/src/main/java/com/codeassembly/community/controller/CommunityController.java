package com.codeassembly.community.controller;

import com.amazonaws.Response;
import com.codeassembly.auth.JwtTokenizer;
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
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/community")
public class CommunityController {
    private final CommunityService communityService;
    private final CommunityMapper mapper;
    private final JwtTokenizer jwtTokenizer;

    public CommunityController(CommunityService communityService, CommunityMapper mapper, JwtTokenizer jwtTokenizer){
        this.communityService = communityService;
        this.mapper = mapper;
        this.jwtTokenizer = jwtTokenizer;
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

    @DeleteMapping("/{communityId}")
    public ResponseEntity deleteCommunity(@PathVariable("communityId") Long communityId){
        communityService.deleteCommunity(communityId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/detail/{communityId}")
    public ResponseEntity getCommunity(@PathVariable("communityId") Long communityId){
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
    public ResponseEntity likeCommunity(@PathVariable("communityId") Long communityId) {
        return ResponseEntity.ok(communityService.likeCommunity(communityId));
    }
}
