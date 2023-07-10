package com.codeassembly.community.entity;

import com.codeassembly.audit.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "Community")
@NoArgsConstructor
@Getter
@Setter
public class CommunityEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityId;
    private String title;
    private String body;

}
