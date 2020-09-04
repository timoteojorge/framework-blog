package com.framework.blog.controller;

import com.framework.blog.dto.CommentDTO;
import com.framework.blog.dto.PostDTO;
import com.framework.blog.entity.Comment;
import com.framework.blog.entity.Post;
import com.framework.blog.service.PostService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/posts")
@Api("Conjunto de endpoints para criar, recuperar, atualizar e deletar objetos do tipo POST")
public class PostController {

    @Autowired
    private PostService service;

    @ApiOperation("Retorna um objeto do tipo POST a partir do id.")
    @GetMapping("/{id}")
    public ResponseEntity<Post> findById(
            @ApiParam("Id do objeto do tipo POST a ser recuperado.") @PathVariable Long id) {
        Post obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @ApiOperation("Retorna uma lista de objetos do tipo POST paginados.")
    @GetMapping
    public ResponseEntity<Page<PostDTO>> findAll(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "20") Integer size,
            @RequestParam(value = "orderBy", defaultValue = "id") String orderBy,
            @RequestParam(value = "direction", defaultValue = "ASC") String direction) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.valueOf(direction), orderBy);
        return ResponseEntity.ok().body(service.findAll(pageRequest));
    }

    @ApiOperation("Retorna um objeto do tipo PostDTO salvo.")
    @PostMapping
    public ResponseEntity<PostDTO> savePost(@RequestBody PostDTO postDTO) {
        Post post = service.save(postDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(post.getId()).toUri();
        return ResponseEntity.created(uri).build();

    }

    @ApiOperation("Retorna um objeto do tipo PostDTO salvo.")
    @PostMapping("/{id}/comments")
    public ResponseEntity<Comment> saveComment(@RequestBody CommentDTO commentDTO,
                                               @PathVariable Long id) {
        Post post = service.addComment(id, commentDTO);
        URI uri = ServletUriComponentsBuilder.fromPath("/posts/" + id + "/comments").path("/{id}")
                .buildAndExpand(post.getId()).toUri();
        return ResponseEntity.created(uri).build();

    }


    @ApiOperation("Retorna uma lista de objetos do tipo CommentDTO paginados.")
    @GetMapping("/{id}/comments")
    public ResponseEntity<Page<CommentDTO>> findComments(
            @PathVariable Long id,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "20") Integer size,
            @RequestParam(value = "orderBy", defaultValue = "createdAt") String orderBy,
            @RequestParam(value = "direction", defaultValue = "DESC") String direction) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.valueOf(direction), orderBy);
        return ResponseEntity.ok().body(service.findComments(id, pageRequest));
    }

    @ApiOperation("Remove um objeto do tipo Comment pelo id.")
    @DeleteMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        service.deleteComment(commentId);
        return ResponseEntity.noContent().build();

    }

    @ApiOperation("Remove um objeto do tipo POST pelo id.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        service.deletePost(id);
        return ResponseEntity.noContent().build();

    }


}
