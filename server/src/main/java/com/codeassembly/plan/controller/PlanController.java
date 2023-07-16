package com.codeassembly.plan.controller;

import com.codeassembly.community.dto.CommunityDto;
import com.codeassembly.community.entity.Community;
import com.codeassembly.plan.dto.PlanDto;
import com.codeassembly.plan.entity.Plan;
import com.codeassembly.plan.mapper.PlanMapper;
import com.codeassembly.plan.service.PlanService;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/plan")
@Validated
public class PlanController {

    private PlanService planService;
    private PlanMapper mapper;

    public PlanController(PlanService planService, PlanMapper mapper) {
        this.planService = planService;
        this.mapper = mapper;
    }

    @PostMapping("/registration/{userId}")
    public ResponseEntity createPlan(@PathVariable("userId") long userId,
                                     @Valid @RequestBody PlanDto.Post requestBody
    ) {
        Plan plan = mapper.planPostToPlan(requestBody);
        Plan createdPlan = planService.createdPlan(userId, plan);
        PlanDto.Response response = mapper.planToPlanResponse(createdPlan);
        response.setUserInfo(new PlanDto.UserInfo(createdPlan.getUser()));
        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    @PatchMapping("/{templatateId}/edit")
    public ResponseEntity updatePlan(@PathVariable("templatateId") Long templatateId,
                                     @Valid @RequestBody PlanDto.Patch requestBody) {
       Plan plan = mapper.planPatchToPlan(requestBody);
       Plan updatePlan = planService.updatePlan(templatateId, plan);
       return new ResponseEntity<>(mapper.planToPlanResponse(updatePlan), HttpStatus.OK);
    }

    @DeleteMapping("/{templatesId}")
    public ResponseEntity deletePlan(@PathVariable("templatateId") Long templatateId){
        planService.deletePlan(templatateId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{templatesId}")
    public ResponseEntity getPlan(@PathVariable("templatateId") Long templatateId){
        Plan plan = planService.findPlan(templatateId);
        return new ResponseEntity<>(mapper.planToPlanResponse(plan), HttpStatus.OK);
    }
}
