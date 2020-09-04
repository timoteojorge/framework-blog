package com.framework.blog.controller;

import com.framework.blog.entity.BlogFile;
import com.framework.blog.service.BlogFileService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/files")
@Api("Conjunto de endpoints para criar, recuperar, atualizar e deletar objetos do tipo BlogFile")
public class BlogFileController {

	@Autowired
	private BlogFileService blogFileService;

	@PostMapping("/upload")
	public ResponseEntity<BlogFile> uploadFile(@RequestParam("file") MultipartFile file) {
		BlogFile arquivo = blogFileService.armazenarArquivo(file);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/download/{id}")
				.buildAndExpand(arquivo.getId()).toUri();

		return ResponseEntity.created(uri).body(arquivo);
	}

	@PostMapping("/upload-multiple")
	public ResponseEntity<List<BlogFile>> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
		List<BlogFile> listaArquivos = Arrays.asList(files).stream().map(file -> blogFileService.armazenarArquivo(file))
				.collect(Collectors.toList());
		return ResponseEntity.ok().body(listaArquivos);
	}

	@GetMapping("/download/{id}")
	public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {
		Optional<BlogFile> arquivo = blogFileService.findById(id);
		if(arquivo.isEmpty()){
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(arquivo.get().getFileType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="+ arquivo.get().getFileName())
				.body(new ByteArrayResource(arquivo.get().getData()));
	}

}
