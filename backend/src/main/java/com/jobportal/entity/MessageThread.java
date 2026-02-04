package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "MessageThreads")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageThread {
    @Id
    @Column(name = "ThreadId")
    private UUID id;

    @Column(name = "Subject")
    private String subject;

    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL)
    private Set<ThreadParticipant> participants;

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL)
    private Set<Message> messages;
}