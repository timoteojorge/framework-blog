package com.framework.blog.repository;

import com.framework.blog.dto.PostDTO;
import com.framework.blog.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends PagingAndSortingRepository<Post, Long>, JpaSpecificationExecutor<Post> {

    @Query("SELECT new com.framework.blog.dto.PostDTO(p.id, p.htmlContent, p.author.name, p.author.id, p.title, p.createdAt) " +
            "FROM Post p")
    Page<PostDTO> findAllPaged(PageRequest page);
}
