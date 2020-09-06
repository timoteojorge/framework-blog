package com.framework.blog.service;

import com.framework.blog.entity.BlogFile;
import com.framework.blog.exception.FileStorageException;
import com.framework.blog.repository.BlogFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Locale;
import java.util.Optional;

@Service
public class BlogFileService {

    @Autowired
    private BlogFileRepository repository;

    @Autowired
    private MessageSource messageSource;

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

    public BlogFile saveFile(MultipartFile file) {

        BlogFile arquivo;
        try {
            String nomeArquivo = StringUtils.cleanPath(file.getOriginalFilename());

            if (nomeArquivo.contains("..")) {
                throw new FileStorageException(messageSource.getMessage("nome.arquivo.invalido", new Object[]{nomeArquivo}, Locale.getDefault()));
            }
            arquivo = BlogFile.builder().data(file.getBytes()).fileName(nomeArquivo).fileSize(file.getSize())
                    .fileType(file.getContentType()).build();
            return repository.save(arquivo);
        } catch (IOException e) {
            throw new FileStorageException(messageSource.getMessage("erro.salvar.arquivo", null, Locale.getDefault()));
        }
    }
}
