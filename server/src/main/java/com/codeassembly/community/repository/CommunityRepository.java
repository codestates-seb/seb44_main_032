package com.codeassembly.community.repository;

import com.codeassembly.community.entity.Community;
import com.codeassembly.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    Optional<Community> findByUser_UserId(long userId);
    Optional<Community> findByCommunityId(long communityId);
    Page<Community> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Community> findByCategory(String Category, Pageable pageable);
}
