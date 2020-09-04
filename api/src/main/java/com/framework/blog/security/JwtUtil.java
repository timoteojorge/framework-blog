package com.framework.blog.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    @Autowired
    private UserDetailsService userDetailsService;


    public String generateToken(BlogUserDetails user) {
        return Jwts.builder().setSubject(user.getEmail())
                .setExpiration(new Date(System.currentTimeMillis() + expiration)).claim("user", user)
                .signWith(SignatureAlgorithm.HS512, secret.getBytes()).compact();
    }

    public boolean validToken(String token) {
        Claims claims = getClaims(token);
        if (claims != null) {
            Date expirationDate = claims.getExpiration();
            Date now = new Date(System.currentTimeMillis());
            if (expirationDate != null && now.before(expirationDate)) {
                return true;
            }
        }
        return false;
    }

    private Claims getClaims(String token) {
        try {
            return Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token).getBody();
        } catch (Exception e) {
            return null;
        }
    }

    public BlogUserDetails getuser(String token) {
        String username = getUsernameFromToken(token);
        return (BlogUserDetails) userDetailsService.loadUserByUsername(username);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getClaims(token);
        return claimsResolver.apply(claims);
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }


}
