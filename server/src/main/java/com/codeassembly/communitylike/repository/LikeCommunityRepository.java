package com.codeassembly.communitylike.repository;

import com.codeassembly.community.entity.Community;
import com.codeassembly.communitylike.entity.LikeCommunity;
import com.codeassembly.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface LikeCommunityRepository extends JpaRepository<LikeCommunity, Long> {
    LikeCommunity findByUserAndCommunity(User user, Community community);
}

