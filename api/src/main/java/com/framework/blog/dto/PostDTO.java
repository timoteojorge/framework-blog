package com.framework.blog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PostDTO {

    private Long id;
    private String htmlContent;
    private List<PostFileDTO> postFiles;
    private List<CommentDTO> comments;
    private String authorName;
    private String title;
    private Long authorId;
    private LocalDateTime createdAt;

    public PostDTO(Long id, String htmlContent, String authorName, Long authorId, String title, LocalDateTime createdAt) {
        this.id = id;
        this.htmlContent = htmlContent;
        this.authorName = authorName;
        this.authorId = authorId;
        this.title = title;
        this.createdAt = createdAt;
    }
}
