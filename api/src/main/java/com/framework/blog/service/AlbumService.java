package com.framework.blog.service;

import com.framework.blog.dto.AlbumDTO;
import com.framework.blog.entity.Album;
import com.framework.blog.entity.BlogFile;
import com.framework.blog.entity.User;
import com.framework.blog.exception.BusinessException;
import com.framework.blog.exception.FileStorageException;
import com.framework.blog.exception.ResourceNotFoundException;
import com.framework.blog.repository.AlbumRepository;
import com.framework.blog.repository.BlogFileRepository;
import com.framework.blog.repository.UserRepository;
import com.framework.blog.security.BlogUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlbumService {

    @Autowired
    AlbumRepository repository;

    @Autowired
    private BlogFileRepository blogFileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    MessageSource messageSource;

    public AlbumDTO findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("album.id.nao.encontrado", new Object[]{id}, Locale.getDefault())))
                .toDTO();
    }

    public AlbumDTO save(AlbumDTO albumDTO) {
        boolean hasErrors = false;
        List<String> errors = new ArrayList<>();
        if (albumDTO.getAlbumPhotos() == null || albumDTO.getAlbumPhotos().size() == 0) {
            hasErrors = true;
            errors.add(messageSource.getMessage("campo.invalido", new Object[]{"Lista de fotos"}, Locale.getDefault()));
        }
        if (StringUtils.isEmpty(albumDTO.getTitle())) {
            hasErrors = true;
            errors.add(messageSource.getMessage("campo.invalido", new Object[]{"Título"}, Locale.getDefault()));
        }
        if (hasErrors) {
            throw new BusinessException(errors.stream().collect(Collectors.joining("\r\n")));
        }

        Album album = albumDTO.toEntity();
        album.setCreatedAt(LocalDateTime.now());
        BlogUserDetails userDetails = (BlogUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = this.userRepository.findById(userDetails.getId()).get();
        album.setAuthor(user);
        return this.repository.save(album).toDTO();
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
            return blogFileRepository.save(arquivo);
        } catch (IOException e) {
            throw new FileStorageException(messageSource.getMessage("erro.salvar.arquivo", null, Locale.getDefault()));
        }
    }
}
