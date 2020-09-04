package com.framework.blog.repository;

import com.framework.blog.dto.CommentDTO;
import com.framework.blog.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends PagingAndSortingRepository<Comment, Long>, JpaSpecificationExecutor<Comment> {


    @Query("SELECT new com.framework.blog.dto.CommentDTO(c.id,c.content,c.post.id,c.author.id,c.author.name) " +
            "FROM Comment c where c.post.id = ?1")
    Page<CommentDTO> findComments(Long id, PageRequest pageRequest);
}
