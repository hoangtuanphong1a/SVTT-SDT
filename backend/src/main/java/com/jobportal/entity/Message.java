package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "Messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MessageId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ThreadId", nullable = false)
    private MessageThread thread;

    @ManyToOne
    @JoinColumn(name = "SenderUserId", nullable = false)
    private User senderUser;

    @Column(name = "Body", nullable = false)
    private String body;

    @Column(name = "SentAt")
    private LocalDateTime sentAt;

    @Column(name = "IsRead")
    private Boolean isRead;

    @Column(name = "AttachmentUrl")
    private String attachmentUrl;
}