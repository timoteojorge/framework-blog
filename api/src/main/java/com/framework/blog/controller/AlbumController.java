package com.framework.blog.controller;

import com.framework.blog.dto.AlbumDTO;
import com.framework.blog.service.AlbumService;
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

import javax.transaction.Transactional;
import java.net.URI;

@RestController
@RequestMapping("/albums")
@Api("Conjunto de endpoints para criar, recuperar, atualizar e deletar objetos do tipo Album")
public class AlbumController {

    @Autowired
    private AlbumService service;

    @ApiOperation("Retorna um objeto do tipo Album a partir do id.")
    @GetMapping("/{id}")
    public ResponseEntity<AlbumDTO> findById(
            @ApiParam("Id do objeto do tipo POST a ser recuperado.") @PathVariable Long id) {
        AlbumDTO obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @ApiOperation("Retorna um objecto do tipo Album salvo.")
    @PostMapping
    public ResponseEntity<AlbumDTO> saveAlbum(@RequestBody AlbumDTO albumDTO) {
        AlbumDTO user = service.save(albumDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(uri).build();

    }


}
