package com.codeassembly.plan.entity;

import com.codeassembly.audit.Auditable;

import com.codeassembly.bookmark.entity.Bookmark;
import com.codeassembly.user.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
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
    @Column(nullable = false)
    private int favorite;
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "categoryId", nullable = false)
    @Column
    private String category;
    @Column
    private LocalDate startDate;
    @Column
    private LocalDate endDate;


    public enum role {

    }
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private User user;



    //카테고리 다대일관계 만들어야함




}
