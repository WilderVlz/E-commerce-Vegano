package com.proyecto.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.proyecto.filters.JWTAuthenticationFilter;
import com.proyecto.filters.JWTAuthorizationFilter;
import com.proyecto.util.JWTUtils;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.beans.factory.annotation.Autowired;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static java.util.Arrays.asList;


@Configuration
//@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true) // Adapter(Old)
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

	private UserDetailsService userDetailsService;
	private JWTAuthEntryPoint jWTAuthEntryPoint;
	private JWTUtils jwtUtils;
	
	public WebSecurityConfig(UserDetailsService userDetailsService, JWTAuthEntryPoint jWTAuthEntryPoint,
			JWTUtils jwtUtils) {
		this.userDetailsService = userDetailsService;
		this.jWTAuthEntryPoint = jWTAuthEntryPoint;
		this.jwtUtils = jwtUtils;
	}


	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		/* .configurationSource(corsConfigurationSource()) */
		// http.cors(cors -> cors.disable());

		/*
		http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint(jWTAuthEntryPoint).and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
			.antMatchers(HttpMethod.POST, Constants.LOGIN_URL).permitAll().anyRequest().authenticated();
		*/
		
		
		//http.cors(withDefaults()).csrf(withDefaults())
		http.cors(cors -> cors.disable()).csrf(csrf -> csrf.disable())
			.exceptionHandling(e -> e.authenticationEntryPoint(jWTAuthEntryPoint))
			.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeHttpRequests(a -> {
				a.requestMatchers("/auth/**", "/VeggieDelivery/**").permitAll();
				//a.requestMatchers("/auth/**").permitAll().anyRequest().authenticated();
			})
			.authenticationProvider(authenticationProvider())
			.addFilterBefore(jWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
			//.addFilterBefore(new JWTAuthenticationFilter((new ProviderManager(authenticationProvider())), jwtUtils),  UsernamePasswordAuthenticationFilter.class) 
			.apply(new JWTHTTPConfigurer(jwtUtils));

		return http.build();
	}

	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		
		System.out.println("entrando a provider");
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(bCryptPasswordEncoder());
		//authProvider.setPasswordEncoder(passwordEncoder());
		
		System.out.println("authProvider=>" + authProvider.getUserCache());
		return authProvider;
	}
	

	@Bean // 2)
	public JWTAuthorizationFilter jWTAuthorizationFilter() {
		return new JWTAuthorizationFilter();
	}

	@Bean // 1)
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfiguration) throws Exception {
		return authConfiguration.getAuthenticationManager();
	}
	

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
				.allowedOrigins("*")
				.allowedMethods("*");
			}
		};
	}

}