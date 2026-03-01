package com.example.demo.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("⚠ No Authorization header for: " + request.getRequestURI());
            chain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        // System.out.println("🔍 Extracted Token: " + token);

        try {
            if (jwtUtil.validateToken(token)) {

                String email = jwtUtil.extractEmail(token);
                List<GrantedAuthority> authorities = jwtUtil.extractRole(token);

                System.out.println("✅ Authenticated User: " + email);
                System.out.println("✅ Roles: " + authorities);
                System.out.println("➡️ Accessing: " + request.getRequestURI());

                User user = new User(email, "", authorities);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null,
                        authorities);

                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);

            } else {
                System.out.println("❌ Invalid JWT for request: " + request.getRequestURI());
            }

        } catch (Exception e) {
            System.out.println("❌ JWT Exception for request: " + request.getRequestURI());
            e.printStackTrace();
        }

        chain.doFilter(request, response);
    }

}
