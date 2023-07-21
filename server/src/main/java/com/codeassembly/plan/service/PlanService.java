package com.codeassembly.plan.service;


import com.codeassembly.bookmark.entity.Bookmark;
import com.codeassembly.bookmark.repository.BookmarkRepository;
import com.codeassembly.community.entity.Community;
import com.codeassembly.exception.BusinessLogicException;
import com.codeassembly.exception.ExceptionCode;
import com.codeassembly.plan.entity.Plan;
import com.codeassembly.plan.repository.PlanRepository;
import com.codeassembly.user.entity.User;
import com.codeassembly.user.repository.UserRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.codeassembly.exception.ExceptionCode.COMMUNITY_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class PlanService {

    private final UserRepository userRepository;
    private final PlanRepository planRepository;
    private final BookmarkRepository bookmarkRepository;

    public Plan createdPlan(long userId, Plan plan) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
        plan.setUser(optionalUser.get());
        return planRepository.save(plan);
    }

    public Plan updatePlan(long planId, Plan plan, String email) {
        Optional<User> user = userRepository.findByEmail(email);
        Plan findPlan = findVerifiedPlan(planId);

        validateWriter(findPlan, user);

        Optional.ofNullable(plan.getTitle())
                .ifPresent(title -> findPlan.setTitle(title));
        Optional.ofNullable(plan.getBody())
                .ifPresent(body -> findPlan.setBody(body));

        return planRepository.save(findPlan);
    }

    public Plan findVerifiedPlan(long planId) {
        Optional<Plan> plan = planRepository.findByPlanId(planId);
        Plan findPlan = plan.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PLAN_NOT_FOUND));

        return findPlan;
    }

    private static void validateWriter(Plan plan, Optional<User> user) {
        if (!user.isPresent() || !user.get().getUserId().equals(plan.getUser().getUserId())) {
            throw new BusinessLogicException(ExceptionCode.UNMATCHED_PLAN_WRITER);
        }
    }
    public Plan deletePlan(Long planId) {
        Plan findPlan = findVerifiedPlan(planId);
        planRepository.delete(findPlan);
        return findPlan;
    }

    public Plan findPlan(Long planId) {
        Plan plan = findVerifiedPlan(planId);
        return plan;
    }

    @Transactional
    public String bookMarkPlan(Long planId) {
        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PLAN_NOT_FOUND));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PLAN_NOT_FOUND));

        if (bookmarkRepository.findByPlanAndUser(plan, user) == null) {

            plan.setFavorite(plan.getFavorite() + 1);
            Bookmark bookmark = new Bookmark(plan, user); // true 처리
            bookmarkRepository.save(bookmark);
            return "북마크 완료";
        } else {

            Bookmark bookmark = bookmarkRepository.findBookMarkByPlan(plan);
            bookmark.unBookmark(plan);
            bookmarkRepository.delete(bookmark);
            return "북마크 취소";
        }
    }

    public Page<Plan> findPlanByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Plan> plansPageByCategory = planRepository.findByCategory(category, pageable);
        return plansPageByCategory;
    }
    public Page<Plan> findPlans(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Plan> plansPage = planRepository.findAll(pageable);
        return plansPage;
    }

//    public Page<Plan> searchPlans(String query, int page, int size){
//        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
//        Page<Plan> plansPage = planRepository.findByTitleContainingIgnoreCase(query, pageable);
//        return plansPage;
//    }

}