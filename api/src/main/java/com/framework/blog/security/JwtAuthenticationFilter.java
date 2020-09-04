package com.framework.blog.security;

import com.framework.blog.exception.InvalidTokenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String header = request.getHeader("Authorization");
            if (header != null && header.startsWith("Bearer ")) {
                String token = header.substring(7);
                UsernamePasswordAuthenticationToken auth = getAuthentication(token);
                if (auth != null) {
                    String updatedToken = jwtUtil.generateToken(jwtUtil.getuser(token));
                    response.setHeader("Authorization", "Bearer " + updatedToken);
                    response.addHeader("access-control-expose-headers", "Authorization, Content-Disposition");
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
            filterChain.doFilter(request, response);
        } catch (InvalidTokenException e) {
            throw new ServletException(e.getMessage());
        }
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String token) {
        if (jwtUtil.validToken(token)) {
            BlogUserDetails eaebUserDetails = jwtUtil.getuser(token);
            UserDetails user = userDetailsService.loadUserByUsername(eaebUserDetails.getEmail());
            return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        }
        throw new InvalidTokenException();
    }

}
