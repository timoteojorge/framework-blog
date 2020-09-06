package com.framework.blog.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.framework.blog.dto.AlbumDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "album", schema = "db_blog")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@EqualsAndHashCode(of = {"id"})
@ToString(of = {"id"})
public class Album {

    @Id
    @SequenceGenerator(name = "album_seq", sequenceName = "db_blog.album_seq", allocationSize = 1, schema = "db_blog")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "album_seq")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "album_photos", joinColumns = @JoinColumn(name = "album_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "photo_id", referencedColumnName = "id"), schema = "db_blog", uniqueConstraints =
    @UniqueConstraint(columnNames = {"album_id", "photo_id"}))
    private List<BlogFile> albumPhotos;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    public AlbumDTO toDTO(){
        return AlbumDTO.builder()
                .id(this.getId())
                .albumPhotos(this.albumPhotos.stream().map(BlogFile::toDTO).collect(Collectors.toList()))
                .createdAt(this.createdAt)
                .title(this.title)
                .authorId(this.author.getId())
                .authorName(this.author.getName())
                .build();
    }
}
