package com.framework.blog.service;

import com.framework.blog.entity.BlogFile;
import com.framework.blog.exception.FileStorageException;
import com.framework.blog.repository.BlogFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class BlogFileService {

	@Autowired
	private BlogFileRepository repository;

	public Optional<BlogFile> findById(Long id) {
		return this.repository.findById(id);
	}

	public BlogFile save(BlogFile arquivo) {
		return this.repository.save(arquivo);
	}

	public BlogFile update(BlogFile arquivo) {
		return this.repository.save(arquivo);
	}

	public void delete(Long id) {
		this.repository.deleteById(id);
	}

	public BlogFile armazenarArquivo(MultipartFile file) {

		BlogFile arquivo;
		try {
			String nomeArquivo = StringUtils.cleanPath(file.getOriginalFilename());

			if (nomeArquivo.contains("..")) {
				throw new FileStorageException("O nome do arquivo é inválido: " + nomeArquivo);
			}
			arquivo = BlogFile.builder().data(file.getBytes()).fileName(nomeArquivo).fileSize(file.getSize())
					.fileType(file.getContentType()).build();
			return repository.save(arquivo);
		} catch (IOException e) {
			throw new FileStorageException("Ocorreu um erro ao salvar o arquivo");
		}
	}
}
