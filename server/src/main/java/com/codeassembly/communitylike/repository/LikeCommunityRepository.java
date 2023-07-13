package com.codeassembly.communitylike;

import com.codeassembly.community.entity.Community;
import com.codeassembly.communitylike.entity.LikeCommunity;
import com.codeassembly.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<LikeCommunity, Long> {
    Optional<LikeCommunity> findByUserAndCommunity(User user, Community community);
}

