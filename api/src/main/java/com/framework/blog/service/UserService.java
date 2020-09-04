package com.framework.blog.service;

import com.framework.blog.dto.UserDTO;
import com.framework.blog.entity.User;
import com.framework.blog.exception.BusinessException;
import com.framework.blog.exception.ResourceNotFoundException;
import com.framework.blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private MessageSource messageSource;

    public User findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("post.id.nao.encontrado", new Object[]{id}, Locale.getDefault())));
    }

    public User save(UserDTO userDTO) {
        boolean hasErrors = false;
        List<String> errors = new ArrayList<>();
        if (StringUtils.isEmpty(userDTO.getEmail())) {
            hasErrors = true;
            errors.add(messageSource.getMessage("campo.invalido", new Object[]{"email"}, Locale.getDefault()));
        }
        if (StringUtils.isEmpty(userDTO.getName())) {
            hasErrors = true;
            errors.add(messageSource.getMessage("campo.invalido", new Object[]{"nome"}, Locale.getDefault()));
        }
        if (StringUtils.isEmpty(userDTO.getPassword())) {
            hasErrors = true;
            errors.add(messageSource.getMessage("campo.invalido", new Object[]{"senha"}, Locale.getDefault()));
        }
        Optional<User> existingUser = repository.findByEmail(userDTO.getEmail());
        if (existingUser.isPresent()) {
            hasErrors = true;
            errors.add(messageSource.getMessage("usuario.ja.existe", new Object[]{userDTO.getEmail()}, Locale.getDefault()));
        }
        if (hasErrors) {
            throw new BusinessException(errors.stream().collect(Collectors.joining("\r\n")));
        }
        User user = User.builder()
                .email(userDTO.getEmail())
                .name(userDTO.getName())
                .password(userDTO.getPassword())
                .build();
        return repository.save(user);
    }
}
