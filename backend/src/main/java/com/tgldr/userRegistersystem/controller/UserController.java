package com.tgldr.userRegistersystem.controller;


import com.tgldr.userRegistersystem.dto.AiModelDTO;
import com.tgldr.userRegistersystem.dto.ReqRes;
import com.tgldr.userRegistersystem.service.UsersManagementService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UsersManagementService usersManagementService;

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody ReqRes request){
//        System.out.println("Register request irlee: "+ request.getEmail()+" , "+ request.getPassword());
        try{
            ReqRes res = usersManagementService.register(request);
            res.setPassword(null);
            return new ResponseEntity<>(res , HttpStatus.CREATED);
        }
        catch (Exception e ){
            return new ResponseEntity<>("Бүртгүүлэхэд алдаа гарлаа." , HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody ReqRes request){
//        System.out.println("Login request irlee: "+ request.getEmail()+" , "+ request.getPassword());
        return new ResponseEntity<>(Map.of("user" , usersManagementService.login(request)) , HttpStatus.OK);
    }
    @PostMapping("/auth/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes request){
        return new ResponseEntity<>(usersManagementService.refreshToken(request) , HttpStatus.OK);
    }
    @GetMapping("/allUsers")
    public ResponseEntity<ReqRes> getAllUsers(){
        return ResponseEntity.ok(usersManagementService.getAllUsers());
    }

    @GetMapping("/user/{id}")
    public  ResponseEntity<ReqRes> getUserById(@PathVariable("id") long userId){
        return ResponseEntity.ok(usersManagementService.getUserById(userId));
    }
}
