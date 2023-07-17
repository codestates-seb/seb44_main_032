package com.codeassembly.plan.repository;

import com.codeassembly.community.entity.Community;
import com.codeassembly.plan.entity.Plan;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    Optional<Plan> findByPlanId(long planId);
//    Page<Plan> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Plan> findByCategory(String Category, Pageable pageable);
}
