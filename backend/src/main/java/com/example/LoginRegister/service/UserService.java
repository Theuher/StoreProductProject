package com.example.LoginRegister.service;

import com.example.LoginRegister.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto saveUser(UserDto userDto);

    List<UserDto> getAllUser();
    UserDto login(String email,String password);
}
