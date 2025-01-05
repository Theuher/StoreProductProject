package com.example.LoginRegister.service.impl;



import com.example.LoginRegister.dto.UserDto;
import com.example.LoginRegister.entity.User;
import com.example.LoginRegister.repository.UserRepository;
import com.example.LoginRegister.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    private ModelMapper modelMapper;

    @Override
    public UserDto saveUser(UserDto userDto) {

        User user = modelMapper.map(userDto, User.class);

        User optionalUser = userRepository.findByEmail(user.getEmail());
        if (optionalUser != null) {
            throw new RuntimeException("Энэ и-мейл хаяг бүртгэлтэй байна.");
        }

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        UserDto saveduserDto = modelMapper.map(savedUser, UserDto.class);
        return saveduserDto;
    }

    @Override
    public List<UserDto> getAllUser() {

        List<User> users = userRepository.findAll();
        List<UserDto> userDtos = users.stream().map((user) -> modelMapper.map(user, UserDto.class))
                .collect(Collectors.toList());
        return userDtos;
    }

    @Override
    public UserDto login(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new IllegalArgumentException("И-мейл эсвэл нууц үг буруу байна");
        }

        if (!bCryptPasswordEncoder.matches(password, user.getPassword()))  {
            throw new IllegalArgumentException("И-мейл эсвэл нууц үг буруу байна");
        }

        return modelMapper.map(user, UserDto.class);
    }
}

