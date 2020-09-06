package com.framework.blog.dto;

import com.framework.blog.entity.BlogFile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BlogFileDTO {

    private Long id;
    private String fileName;
    private String fileType;
    private byte[] data;
    private long fileSize;

    public BlogFile toEntity() {
		return BlogFile.builder()
				.data(this.getData())
				.fileType(this.getFileType())
				.fileName(this.getFileName())
				.fileSize(this.getFileSize())
				.id(this.getId())
				.build();
    }

}
