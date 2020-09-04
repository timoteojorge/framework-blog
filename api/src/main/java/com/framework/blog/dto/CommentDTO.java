package com.framework.blog.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CommentDTO {

	private Long id;
	private String content;
	private Long postId;
	private Long authorId;
	private String authorName;

	public CommentDTO(Long id, String content, Long postId, Long authorId, String authorName) {
		this.id = id;
		this.content = content;
		this.postId = postId;
		this.authorId = authorId;
		this.authorName = authorName;
	}

	public CommentDTO() {
	}
}
