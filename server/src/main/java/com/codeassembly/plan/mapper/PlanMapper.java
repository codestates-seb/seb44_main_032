package com.codeassembly.plan.mapper;

import com.codeassembly.plan.dto.PlanDto;
import com.codeassembly.plan.dto.PlanDto.Response;
import com.codeassembly.plan.entity.Plan;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PlanMapper {
    Plan planPostToPlan(PlanDto.Post requestBody);
    Plan planPatchToPlan(PlanDto.Patch requestBody);
    PlanDto.Response planToPlanResponse(Plan plan);
    List<PlanDto.Response> plansToPlanResponses(List<Plan> plans);
}
