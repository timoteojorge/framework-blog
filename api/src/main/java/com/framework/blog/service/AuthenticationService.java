package com.framework.blog.service;

import com.framework.blog.dto.CredentialsDTO;
import com.framework.blog.security.BlogUserDetails;
import com.framework.blog.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

	@Autowired
	JwtUtil jwtUtil;

	@Autowired
    AuthenticationManager authenticationManager;

	public String login(CredentialsDTO credenciais) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(credenciais.getEmail(), credenciais.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		BlogUserDetails blogUserDetails = (BlogUserDetails) authentication.getPrincipal();
		String token = jwtUtil.generateToken(blogUserDetails);

		return token;
	}
}
