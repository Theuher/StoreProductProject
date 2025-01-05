package com.example.LoginRegister;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude ={
		org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class
} )
public class LoginRegisterApplication {
	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}

	public static void main(String[] args) {
		SpringApplication.run(LoginRegisterApplication.class, args);
	}

}
