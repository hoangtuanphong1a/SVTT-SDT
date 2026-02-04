package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "ThreadParticipants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThreadParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ThreadParticipantId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ThreadId", nullable = false)
    private MessageThread thread;

    @ManyToOne
    @JoinColumn(name = "UserId", nullable = false)
    private User user;

    @Column(name = "JoinedAt")
    private LocalDateTime joinedAt;

    @Column(name = "IsMuted")
    private Boolean isMuted;
}