package com.codeassembly.bookmark.entity;

import com.codeassembly.audit.Auditable;
import com.codeassembly.plan.entity.Plan;
import com.codeassembly.user.entity.User;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.joda.time.LocalDate;
import javax.persistence.Id;
import org.springframework.format.annotation.DateTimeFormat;

@Entity(name = "Bookmark")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class Bookmark extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookMarkId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "planId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Plan plan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(nullable = false)
    private boolean status;

    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate createDate;

    @PrePersist
    public void createDate() {
        this.createDate = LocalDate.now();
    }

    public Bookmark(Plan plan, User user) {
        this.plan = plan;
        this.user = user;
        this.status = true;
    }

    public void unBookmark(Plan plan) {
        this.status = false;
        plan.setFavorite(plan.getFavorite() - 1);
    }
}
