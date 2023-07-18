package com.codeassembly.bookmark.repository;

import com.codeassembly.bookmark.entity.Bookmark;
import com.codeassembly.plan.entity.Plan;
import com.codeassembly.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Bookmark findByPlanAndUser(Plan plan, User user);
    Bookmark findBookMarkByPlan(Plan plan);
}
