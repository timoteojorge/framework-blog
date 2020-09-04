package com.framework.blog.controller;

import com.framework.blog.dto.UserDTO;
import com.framework.blog.entity.User;
import com.framework.blog.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/users")
@Api("Conjunto de endpoints para criar, recuperar, atualizar e deletar objetos do tipo User")
public class UserController {

    @Autowired
    private UserService service;

    @ApiOperation("Retorna um objeto do tipo POST a partir do id.")
    @GetMapping("/{id}")
    public ResponseEntity<User> findById(
            @ApiParam("Id do objeto do tipo POST a ser recuperado.") @PathVariable Long id) {
        User obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @ApiOperation("Retorna um objeto do tipo User salvo.")
    @PostMapping
    public ResponseEntity<User> savePost(@RequestBody UserDTO userDTO) {
        User user = service.save(userDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(uri).build();

    }


}
