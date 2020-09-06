package com.framework.blog.dto;

import com.framework.blog.entity.Album;
import com.framework.blog.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AlbumDTO {

    private Long id;
    private String title;
    private LocalDateTime createdAt;
    private List<BlogFileDTO> albumPhotos;
    private String authorName;
    private Long authorId;

    public Album toEntity() {
        return Album.builder()
                .id(this.getId())
                .title(this.getTitle())
                .createdAt(this.getCreatedAt())
                .albumPhotos(this.albumPhotos.stream().map(BlogFileDTO::toEntity).collect(Collectors.toList()))
                .author(User.builder().name(this.getAuthorName()).id(this.getAuthorId()).build())
                .build();
    }
}
