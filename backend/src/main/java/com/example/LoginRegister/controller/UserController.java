package com.example.LoginRegister.controller;

import com.example.LoginRegister.dto.UserDto;
import com.example.LoginRegister.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("api/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> saveUser(@RequestBody UserDto userDto){
        System.out.println("Register huselt huleen avlaa: "+ userDto.getEmail()+" , "+userDto.getPassword());
        try {
            if (userDto.getEmail() == null){
                return new ResponseEntity<>("И-мейлээ оруулна уу", HttpStatus.BAD_REQUEST);
            }
            if (userDto.getPassword() == null){
                return new ResponseEntity<>("Нууц үгээ оруулна уу",HttpStatus.BAD_REQUEST);
            }
            UserDto savedUserDto = userService.saveUser(userDto);
            savedUserDto.setPassword(null);
            return new ResponseEntity<>(savedUserDto , HttpStatus.CREATED);
        }catch (Exception exception){
            return new ResponseEntity<>("Бүртгүүлэхэд алдаа гарлаа." , HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> requestBody) {
        System.out.println("Login huselt huleen avlaa: "+ requestBody);
        try {
            String email = requestBody.get("email");
            String password = requestBody.get("password");

            if (email == null || email.isEmpty()) {
                return new ResponseEntity<>("И-Мейлээ оруулна уу", HttpStatus.BAD_REQUEST);
            }
            if (password == null || password.isEmpty()) {
                return new ResponseEntity<>("Нууц үгээ оруулна уу", HttpStatus.BAD_REQUEST);
            }

            UserDto userDto = userService.login(email, password);

            if (userDto == null) {
                return new ResponseEntity<>("хэрэглэгч олдсонгүй", HttpStatus.UNAUTHORIZED);
            }
            userDto.setPassword(null);
            return new ResponseEntity<>(Map.of("user" , userDto), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Нэвтрэхэд алдаа гарлаа.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUser(){
        List<UserDto> userDtos = userService.getAllUser();
        return new ResponseEntity<>(userDtos , HttpStatus.OK);
    }
}
