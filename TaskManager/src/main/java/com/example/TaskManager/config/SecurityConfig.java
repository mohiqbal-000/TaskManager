


package com.example.TaskManager.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.TaskManager.service.CustomUserDetailsService;

import org.springframework.web.cors.CorsConfiguration;


@Configuration
public class SecurityConfig {
    
@Autowired
private JwtFilter jwtFilter;
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();

    }
    @Bean
    public SecurityFilterChain filterchain(HttpSecurity http) throws Exception {
      return  http
            .cors(withDefaults())
            .csrf(customizer -> customizer.disable())
            .authorizeHttpRequests(request -> request
            .requestMatchers("/api/register","/api/login")
            .permitAll()
         .anyRequest().authenticated())
        .httpBasic(Customizer.withDefaults())
        .sessionManagement(session -> 
               session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)

               .build();
            
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);


        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
        
    }

//     @Bean
//  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
     
        
//        return  config.getAuthenticationManager();
//     }

@Bean
public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder encoder, CustomUserDetailsService userDetailsService) throws Exception {
    return http.getSharedObject(AuthenticationManagerBuilder.class)
        .userDetailsService(userDetailsService)
        .passwordEncoder(encoder)
        .and()
        .build();
}

} 