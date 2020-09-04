package com.framework.blog.repository;

import com.framework.blog.entity.BlogFile;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogFileRepository extends PagingAndSortingRepository<BlogFile, Long>, JpaSpecificationExecutor<BlogFile> {
}
