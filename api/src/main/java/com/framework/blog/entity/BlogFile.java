package com.framework.blog.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.framework.blog.dto.BlogFileDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@EqualsAndHashCode(of = {"id"})
@Table(name = "file", schema = "db_blog")
@ToString(of = {"id"})
public class BlogFile {

    @Id
    @SequenceGenerator(name = "file_seq", sequenceName = "db_blog.file_seq", allocationSize = 1, schema = "db_blog")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "file_seq")
    private Long id;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_type")
    private String fileType;

    @Column(columnDefinition = "bytea")
    private byte[] data;

    @Column(name = "file_size")
    private long fileSize;

    public BlogFileDTO toDTO() {
		return BlogFileDTO.builder()
				.id(this.id)
				.fileName(this.fileName)
				.data(this.data)
				.fileSize(this.fileSize)
				.build();
    }

}
