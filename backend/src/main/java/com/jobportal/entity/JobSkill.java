package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "JobSkills")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "JobSkillId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "JobId", nullable = false)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "SkillId", nullable = false)
    private Skill skill;
}