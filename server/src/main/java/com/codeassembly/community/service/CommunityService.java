package com.codeassembly.community.service;


import com.codeassembly.comment.entity.Comment;
import com.codeassembly.community.entity.Community;
import com.codeassembly.community.repository.CommunityRepository;
import com.codeassembly.communitylike.entity.LikeCommunity;
import com.codeassembly.communitylike.repository.LikeCommunityRepository;
import com.codeassembly.exception.BusinessLogicException;
import com.codeassembly.exception.ExceptionCode;
import com.codeassembly.s3.dto.S3FileDto;
import com.codeassembly.s3.service.Amazon3SService;
import com.codeassembly.user.entity.User;
import com.codeassembly.user.repository.UserRepository;
import com.codeassembly.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import static com.codeassembly.exception.ExceptionCode.COMMUNITY_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class CommunityService {
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;
    private final LikeCommunityRepository likeCommunityRepository;
    private final UserService userService;


    public Community createdCommunity(long userId, Community community) {

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
        community.setUser(optionalUser.get());
        return communityRepository.save(community);
    }

    public Community updateCommunity(long userId, Community community) {
        User user = userService.findByUserId(userId);
        Community community1 = findCommunity2(community.getCommunityId());
        validateWriter(community1, user);
        Optional.ofNullable(community.getTitle())
                .ifPresent(title -> community.setTitle(title));
        Optional.ofNullable(community.getBody())
                .ifPresent(body -> community.setBody(body));
        return communityRepository.save(community);
    }
    private static void validateWriter(Community community1, User user) {
        if (user.getUserId() != community1.getUser().getUserId()) {
            throw new BusinessLogicException(ExceptionCode.UNMATCHED_COMMUNITY_WRITER);
        }
    }

    public Community findVerifiedCommunity(long communityId) {
        Optional<Community> optionalCommunity =
                communityRepository.findByCommunityId(communityId);
        Community findCommunity =
                optionalCommunity.orElseThrow(() -> new BusinessLogicException(COMMUNITY_NOT_FOUND));

        return findCommunity;
    }

    public void deleteCommunity(Long communityId) {
        Community findCommunity = findVerifiedCommunity(communityId);
        communityRepository.delete(findCommunity);
    }

    public Community findCommunity(Long communityId) {
        Community community = findVerifiedCommunity(communityId);
        community.setViews((community.getViews() + 1)); //조회수 +1
        return community;
    }
    public Community findCommunity2(Long communityId) {
        Community community = findVerifiedCommunity(communityId);
        return community;
    }
    public Page<Community> findCommunities(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Community> communitiesPage = communityRepository.findAll(pageable);

        return communitiesPage;
    }

    public Page<Community> searchCommunities(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Community> communitiesPage = communityRepository.findByTitleContainingIgnoreCase(query, pageable);
        return communitiesPage;
    }

    @Transactional
    public String likeCommunity(Long communityId) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMUNITY_NOT_FOUND));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        if (likeCommunityRepository.findByUserAndCommunity(user, community) == null) {
            // 좋아요를 누른적 없다면 LikeCommunity 생성 후, 좋아요 처리
            community.setLiked(community.getLiked() + 1);
            LikeCommunity likeCommunity = new LikeCommunity(community, user); // true 처리
            likeCommunityRepository.save(likeCommunity);
            return "좋아요 처리 완료";
        } else {
            // 좋아요를 누른적 있다면 취소 처리 후 테이블 삭제
            LikeCommunity likeCommunity = likeCommunityRepository.findByUserAndCommunity(user, community);
            likeCommunity.unLikeCommunity(community);
            likeCommunityRepository.delete(likeCommunity);
            return "좋아요 취소";
        }
    }

    public Page<Community> findCommunitiesByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Community> communitiesPageByCategory = communityRepository.findByCategory(category, pageable);
        return communitiesPageByCategory;
    }

}


