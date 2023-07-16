package com.codeassembly.plan.entity;

import com.codeassembly.audit.Auditable;
import com.codeassembly.user.entity.User;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Plan")
@NoArgsConstructor
@Getter
@Setter
public class Plan extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long planId;
    @Column
    private String title;
    @Column
    private String body;
    @Column
    private long bookmark;
    //role 질문
    public enum role {

    }
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    //카테고리 질문


}
