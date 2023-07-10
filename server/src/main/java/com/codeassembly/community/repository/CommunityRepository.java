package com.codeassembly.community.repository;

import com.codeassembly.community.entity.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    Optional<Community> findByCommunityId(long communityId);
    Page<Community> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
