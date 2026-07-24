package com.example.demo.config;

import com.example.demo.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            AuthenticationProvider authenticationProvider) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authenticationProvider = authenticationProvider;
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:3000"));

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                ));

        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type",
                        "Accept"
                ));

        configuration.setAllowCredentials(true);


        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http

                // Disable CSRF for REST API
                .csrf(csrf -> csrf.disable())

                // Enable CORS
                .cors(Customizer.withDefaults())

                // JWT uses stateless sessions
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        ))

                .authorizeHttpRequests(auth -> auth


                        // Authentication APIs
                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()


                        // Swagger APIs
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**"
                        ).permitAll()


                        // Medicine APIs
                        .requestMatchers(
                                "/api/medicines/**"
                        ).permitAll()


                        // Pharmacy APIs
                        .requestMatchers(
                                "/api/pharmacies/search/**",
                                "/api/pharmacies/nearby"
                        ).permitAll()


                        // Everything else requires JWT
                        .anyRequest().authenticated()
                )


                .authenticationProvider(authenticationProvider)


                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();
    }
}