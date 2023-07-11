package com.codeassembly.community.service;


import com.codeassembly.community.entity.Community;
import com.codeassembly.community.repository.CommunityRepository;
import com.codeassembly.exception.BusinessLogicException;
import com.codeassembly.exception.ExceptionCode;
import com.codeassembly.s3.dto.S3FileDto;
import com.codeassembly.s3.service.Amazon3SService;
import com.codeassembly.user.entity.User;
import com.codeassembly.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
@Service
@Transactional
@RequiredArgsConstructor
public class CommunityService {
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;
    private final Amazon3SService amazon3SService;
    public Community createdCommunity(long userId, Community community) {

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        }
        community.setUser(optionalUser.get());
        return communityRepository.save(community);
    }

    public Community updateCommunity(Long userId, Community community) {
        Community findCommunity = findVerifiedCommunity(userId);
        Optional.ofNullable(community.getTitle())
                .ifPresent(title -> findCommunity.setTitle(title));
        Optional.ofNullable(community.getBody())
                .ifPresent(body ->findCommunity.setBody(body));
        return communityRepository.save(findCommunity);
    }

    public Community findVerifiedCommunity(long communityId){
        Optional<Community> question =
                communityRepository.findByCommunityId(communityId);
        Community findQuestion =
                question.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMUNITY_NOT_FOUND));

        return findQuestion;
    }

    public void deleteCommunity(Long communityId) {
        Community findCommunity = findVerifiedCommunity(communityId);
        communityRepository.delete(findCommunity);
    }

    public Community findCommunity(Long communityId) {
        Community community = findVerifiedCommunity(communityId);
        community.setViews((community.getViews() +1)); //조회수 +1
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
}
