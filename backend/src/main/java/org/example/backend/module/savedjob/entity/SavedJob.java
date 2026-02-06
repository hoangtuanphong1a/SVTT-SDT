package org.example.backend.module.savedjob.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.example.backend.common.base.BaseEntity;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "saved_jobs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SavedJob extends BaseEntity {
    
    @Column(name = "job_id", nullable = false)
    private Long jobId;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
}