package com.codeassembly.plan.controller;

import com.codeassembly.auth.JwtTokenizer;
import com.codeassembly.community.dto.CommunityDto;
import com.codeassembly.community.entity.Community;
import com.codeassembly.plan.dto.PlanDto;
import com.codeassembly.plan.dto.PlanDto.Response;
import com.codeassembly.plan.dto.PlanDto.UserInfo;
import com.codeassembly.plan.entity.Plan;
import com.codeassembly.plan.mapper.PlanMapper;
import com.codeassembly.plan.service.PlanService;
import com.codeassembly.response.MultiResponseDto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

import com.codeassembly.response.SingleResponseDto;
import org.joda.time.LocalDate;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/plan")
@Validated
public class PlanController {

    private PlanService planService;
    private PlanMapper mapper;
    private JwtTokenizer jwtTokenizer;

    public PlanController(PlanService planService, PlanMapper mapper, JwtTokenizer jwtTokenizer) {
        this.planService = planService;
        this.mapper = mapper;
        this.jwtTokenizer = jwtTokenizer;
    }

    @PostMapping("/registration/{userId}")
    public ResponseEntity postPlan(@PathVariable("userId") long userId,
                                   @Valid @RequestBody PlanDto.Post requestBody,
                                   @RequestHeader("Authorization") String token) {

        String getToken = jwtTokenizer.getUsername(token);

        Plan plan = mapper.planPostToPlan(requestBody);
        Plan createdPlan = planService.createdPlan(userId, plan);
        PlanDto.Response response = mapper.planToPlanResponse(createdPlan);
        response.setUserInfo(new PlanDto.UserInfo(createdPlan.getUser()));

        // 토큰 정보를 응답에 포함시킴
        Map<String, Object> responseCreate = new HashMap<>();
        responseCreate.put("token", getToken);
        responseCreate.put("data", response);

        return new ResponseEntity<>(responseCreate, HttpStatus.CREATED);
    }

    @PostMapping("/bookmark/{planId}")
    public ResponseEntity bookMarkPlan(@PathVariable("planId") Long planId,
                                       @RequestHeader("Authorization") String token) {

        String getToken = jwtTokenizer.getUsername(token);

        String bookmarkedCommunity = planService.bookMarkPlan(planId);


        // 토큰 정보를 응답에 포함시킴
        Map<String, Object> responseBookmark = new HashMap<>();
        responseBookmark.put("token", getToken);
        responseBookmark.put("data", bookmarkedCommunity);

        return new ResponseEntity<>(responseBookmark, HttpStatus.OK);

    }

    @PatchMapping("/edit/{planId}")
    public ResponseEntity patchPlan(@PathVariable("planId") Long planId,
                                    @Valid @RequestBody PlanDto.Patch requestBody,
                                    @RequestHeader("Authorization") String token) {

        String getToken = jwtTokenizer.getUsername(token);

        Plan plan = mapper.planPatchToPlan(requestBody);
        Plan updatePlan = planService.updatePlan(planId, plan, getToken);
        PlanDto.Response updatedPlan = mapper.planToPlanResponse(updatePlan);

        return ResponseEntity.ok(new SingleResponseDto<>(updatedPlan));
    }

//    @PatchMapping("/edit/{communityId}")
//    public ResponseEntity patchCommunity(@PathVariable("communityId") Long communityId,
//                                         @Valid @RequestBody CommunityDto.Patch requestBody,
//                                         @RequestHeader("Authorization") String token) {
//
//        String getToken = jwtTokenizer.getUsername(token);
//
//        Community community = mapper.communityPatchDtoToCommunity(requestBody);
//        Community updateCommunity = communityService.updateCommunity(communityId, community, getToken);
//        CommunityDto.Response response = mapper.communityToResponseDto(updateCommunity);
//
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

    @DeleteMapping("/{planId}")
    public ResponseEntity deletePlan(@PathVariable("planId") Long planId,
                                     @RequestHeader("Authorization") String token) {

        String getToken = jwtTokenizer.getUsername(token);

        Plan deletedPlan = planService.deletePlan(planId);

        // 토큰 정보를 응답에 포함시킴
        Map<String, Object> responseDelete= new HashMap<>();
        responseDelete.put("token", getToken);
        responseDelete.put("data", deletedPlan);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/detail/{planId}")
    public ResponseEntity getPlan(@PathVariable("planId") Long planId){
        Plan plan = planService.findPlan(planId);
        PlanDto.Response response = mapper.planToPlanResponse(plan);
        response.setUserInfo(new UserInfo(plan.getUser()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
   @GetMapping("/all")
   public ResponseEntity getPlans(@Positive @RequestParam(defaultValue = "1") int page,
                                  @Positive @RequestParam(defaultValue = "10") int size){
        Page<Plan> pagePlan = planService.findPlans(page - 1, size);
        List<Plan> plans = pagePlan.getContent();
        List<PlanDto.Response> responses = new ArrayList<>();
        for (Plan plan : plans) {
            PlanDto.UserInfo userInfo = new PlanDto.UserInfo(plan.getUser());
            responses.add(new PlanDto.Response(plan, userInfo));
        }
        return new ResponseEntity<>(new MultiResponseDto<>(responses, pagePlan), HttpStatus.OK);
   }



    @GetMapping("/category/{category}")
    public ResponseEntity getPlansByCategoryAndPage(
            @PathVariable("category") String category,
            @Positive @RequestParam(defaultValue = "1") int page,
            @Positive @RequestParam(defaultValue = "10") int size) {

        Page<Plan> pagePlan = planService.findPlanByCategory(category, page - 1, size);
        List<Plan> plans = pagePlan.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.plansToPlanResponses(plans), pagePlan), HttpStatus.OK);
    }
}