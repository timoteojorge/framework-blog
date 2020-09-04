package com.framework.blog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PostFileDTO {

	private Long id;
	private String fileName;
	private String fileType;
	private byte[] data;
	private long fileSize;

}
