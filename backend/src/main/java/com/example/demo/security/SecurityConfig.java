package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
            		.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow CORS preflight requests
            	    .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
            	    .requestMatchers(HttpMethod.POST, "/api/bookings/**").authenticated()
            	    .requestMatchers(HttpMethod.POST, "/api/admin/**").hasAuthority("ROLE_ADMIN")
            	    .requestMatchers(HttpMethod.PUT, "/api/admin/**").hasAuthority("ROLE_ADMIN")
            	    .requestMatchers(HttpMethod.DELETE, "/api/admin/**").hasAuthority("ROLE_ADMIN")
            	    .requestMatchers("/user/**").permitAll()
            	    .requestMatchers("/routes/**").permitAll()
            	    .requestMatchers("/api/bus-routes/search").permitAll()
            	    .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
