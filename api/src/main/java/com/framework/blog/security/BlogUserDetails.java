package com.framework.blog.security;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

public class BlogUserDetails implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Long id;

	@Getter
	private String email;
	@Getter
	private String name;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	public BlogUserDetails(Long id, String email, String name, String password) {
		super();
		this.id = id;
		this.email = email;
		this.name = name;
		this.password = password;
		this.authorities = Arrays.asList(new SimpleGrantedAuthority("USER_ROLE"));
	}

	public BlogUserDetails() {
	}

	public Long getId() {
		return id;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
