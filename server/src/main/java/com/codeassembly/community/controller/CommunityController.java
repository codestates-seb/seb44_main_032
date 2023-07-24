package com.codeassembly.community.controller;

import com.codeassembly.auth.JwtTokenizer;
import com.codeassembly.community.dto.CommunityDto;
import com.codeassembly.community.entity.Community;
import com.codeassembly.community.mapper.CommunityMapper;
import com.codeassembly.community.service.CommunityService;
import com.codeassembly.response.MultiResponseDto;
import com.codeassembly.response.SingleResponseDto;
import com.codeassembly.s3.dto.S3FileDto;
import com.codeassembly.s3.service.Amazon3SService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    private final Amazon3SService amazon3SService;

    public CommunityController(CommunityService communityService, CommunityMapper mapper, JwtTokenizer jwtTokenizer, Amazon3SService amazon3SService) {
        this.communityService = communityService;
        this.mapper = mapper;
        this.jwtTokenizer = jwtTokenizer;
        this.amazon3SService = amazon3SService;
    }

    @PostMapping("/registration/{userId}")
    public ResponseEntity<Object> createCommunityWithFiles(
            @PathVariable("userId") Long userId,
            @RequestPart(value = "files", required = false) List<MultipartFile> multipartFiles,
            @Valid CommunityDto.Post requestBody,
            @RequestHeader("Authorization") String token,
            @RequestParam(value = "fileType", required = false) String fileType) {

        String getToken = jwtTokenizer.getUsername(token);

        // 파일 업로드 처리
        List<S3FileDto> uploadedFileUrls = null;
        if (multipartFiles != null && !multipartFiles.isEmpty()) {
            // 파일이 전송된 경우에만 파일 업로드를 처리
            uploadedFileUrls = amazon3SService.uploadFiles(fileType, multipartFiles);
        }

        // 게시판 생성 처리
        Community community = mapper.communityPostDtoToCommunity(requestBody);
        Community createdCommunity = communityService.createdCommunity(userId, community);
        CommunityDto.Response response = mapper.communityToResponseDto(createdCommunity);
        response.setUserInfo(new CommunityDto.UserInfo(createdCommunity.getUser())); // userInfo 설정

        // 토큰 정보와 파일 업로드 결과를 응답에 포함시킴
        Map<String, Object> responseCreate = new HashMap<>();
        responseCreate.put("token", getToken);
        responseCreate.put("data", response);
        if (uploadedFileUrls != null) {
            responseCreate.put("uploadedFiles", uploadedFileUrls); // 업로드된 파일 URL 리스트
        }

        return new ResponseEntity<>(responseCreate, HttpStatus.CREATED);
    }

    @PatchMapping("/edit/{communityId}")
    public ResponseEntity<Object> patchCommunityWithFiles(
            @PathVariable("communityId") Long communityId,
            @RequestPart(value = "files", required = false) List<MultipartFile> multipartFiles,
            @RequestParam(value = "fileType", required = false) String fileType,
            @RequestParam(value = "deleteFile", required = false) boolean deleteFile,
            @RequestParam(value = "uploadFilePath", required = false) String uploadFilePath,
            @RequestParam(value = "uuidFileName", required = false) String uuidFileName,
            @Valid  CommunityDto.Patch requestBody,
            @RequestHeader("Authorization") String token) {

        String getToken = jwtTokenizer.getUsername(token);

        List<S3FileDto> uploadedFileUrls = null;

        // 파일 삭제 처리
        if (deleteFile && uploadFilePath != null && uuidFileName != null) {
            amazon3SService.deleteFile(uploadFilePath, uuidFileName);
        }

        // 파일 업로드 처리
        if (multipartFiles != null && !multipartFiles.isEmpty()) {
            uploadedFileUrls = amazon3SService.uploadFiles(fileType, multipartFiles);
        }

        // 게시글 수정 처리
        Community community = mapper.communityPatchDtoToCommunity(requestBody);
        Community updateCommunity = communityService.updateCommunity(communityId, community, getToken);
        CommunityDto.Response response = mapper.communityToResponseDto(updateCommunity);

        // 토큰 정보와 파일 업로드 결과를 응답에 포함시킴
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("token", getToken);
        responseMap.put("data", response);
        if (uploadedFileUrls != null) {
            responseMap.put("uploadedFiles", uploadedFileUrls); // 업로드된 파일 URL 리스트
        }

        return ResponseEntity.ok(responseMap);
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