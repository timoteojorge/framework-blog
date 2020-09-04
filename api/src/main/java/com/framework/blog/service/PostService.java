package com.framework.blog.service;

import com.framework.blog.dto.CommentDTO;
import com.framework.blog.dto.PostDTO;
import com.framework.blog.dto.PostFileDTO;
import com.framework.blog.entity.Comment;
import com.framework.blog.entity.Post;
import com.framework.blog.entity.BlogFile;
import com.framework.blog.exception.BusinessException;
import com.framework.blog.exception.ResourceNotFoundException;
import com.framework.blog.exception.UnauthorizedException;
import com.framework.blog.repository.CommentRepository;
import com.framework.blog.repository.PostRepository;
import com.framework.blog.repository.UserRepository;
import com.framework.blog.security.BlogUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository repository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageSource messageSource;

    public Post findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("post.id.nao.encontrado", new Object[]{id}, Locale.getDefault())));
    }

    public Page<PostDTO> findAll(PageRequest page) {
        return this.repository.findAllPaged(page);
    }

    public Post save(PostDTO postDTO) {
        if (StringUtils.isEmpty(postDTO.getHtmlContent())) {
            throw new BusinessException(messageSource.getMessage("post.conteudo.nao.vazio", null, Locale.getDefault()));
        }
        Post post = Post.builder()
                .author(userRepository.findById(postDTO.getAuthorId()).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("post.autor.id.nao.encontrado", new Object[]{postDTO.getAuthorId()}, Locale.getDefault()))))
                .createdAt(LocalDateTime.now())
                .htmlContent(postDTO.getHtmlContent())
                .postFiles(postFilesFromDTO(postDTO.getPostFiles()))
                .title(postDTO.getTitle())
                .build();
        return this.repository.save(post);
    }

    private List<BlogFile> postFilesFromDTO(List<PostFileDTO> postFileDTO) {
        if (postFileDTO != null) {
            return postFileDTO.stream()
                    .map(dto -> BlogFile.builder().data(dto.getData())
                            .fileName(dto.getFileName())
                            .fileSize(dto.getFileSize())
                            .fileType(dto.getFileType())
                            .build()).collect(Collectors.toList());
        }
        return null;
    }

    public Post addComment(Long id, CommentDTO commentDTO) {
        Post post = this.findById(id);
        post.getComments().add(fromCommentDTO(commentDTO, post));
        return repository.save(post);
    }

    private Comment fromCommentDTO(CommentDTO commentDTO, Post post) {
        return Comment.builder()
                .author(userRepository.findById(commentDTO.getAuthorId()).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("post.autor.id.nao.encontrado", new Object[]{commentDTO.getAuthorId()}, Locale.getDefault()))))
                .content(commentDTO.getContent())
                .createdAt(LocalDateTime.now())
                .post(post)
                .build();
    }

    public Page<CommentDTO> findComments(Long id, PageRequest pageRequest) {
        return this.commentRepository.findComments(id, pageRequest);
    }

    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("comment.id.nao.encontrado", new Object[]{commentId}, Locale.getDefault())));
        BlogUserDetails user = (BlogUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (comment.getAuthor().getId().intValue() != user.getId().intValue()) {
            throw new UnauthorizedException(messageSource.getMessage("comment.remove.unauthorized", null, Locale.getDefault()));
        }
        this.commentRepository.deleteById(commentId);
    }

    public void deletePost(Long id) {
        Post post = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("post.id.nao.encontrado", new Object[]{id}, Locale.getDefault())));
        BlogUserDetails user = (BlogUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (post.getAuthor().getId().intValue() != user.getId().intValue()) {
            throw new UnauthorizedException(messageSource.getMessage("post.remove.unauthorized", null, Locale.getDefault()));
        }
        this.repository.deleteById(id);
    }
}
