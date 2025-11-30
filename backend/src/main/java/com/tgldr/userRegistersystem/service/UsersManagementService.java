package com.tgldr.userRegistersystem.service;


import com.tgldr.userRegistersystem.dto.ReqRes;
import com.tgldr.userRegistersystem.entity.User;
import com.tgldr.userRegistersystem.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UsersManagementService {

    @Autowired
    private UsersRepo usersRepo ;

    @Autowired
    private  JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public ReqRes register(ReqRes registrationRequest){
        ReqRes response = new ReqRes();

        try {
            Optional<User> optionalUser = usersRepo.findByEmail(registrationRequest.getEmail());
            if(optionalUser.isPresent()){
                throw new RuntimeException("Энэ и-мейл хаяг бүртгэлтэй байна.");
            }
            User user = new User();
            user.setEmail(registrationRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            User userResult = usersRepo.save(user);
            if(userResult.getId() > 0 ){
                response.setUser( userResult);
                response.setMessage("Бүртгэл амжилттай");
                response.setStatusCode(201);
            }
        }catch (Exception e){
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    };


    public ReqRes login(ReqRes loginRequest){
        ReqRes response = new ReqRes();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail() ,
                            loginRequest.getPassword()));
            var user = usersRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setUser(user);
            response.setEmail(user.getEmail());
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("1Hr");
            response.setMessage("Амжилттай нэвтэрлээ");

        }catch (Exception e ){
            response.setStatusCode(500);
            response.setError(e.getMessage());

        }
        return response;
    };

    public ReqRes getAllUsers(){
        ReqRes response = new ReqRes();
        try {
            List<User> usersList = usersRepo.findAll();
            if (!usersList.isEmpty()){
                response.setUsersList(usersList);
                response.setStatusCode(200);
                response.setMessage("Амжилттай");
            }
            else{
                response.setStatusCode(404);
                response.setMessage("Хэрэглэгч олдсонгүй");
            }
            return response;
        }catch (Exception e)
        {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }

    };

    public ReqRes refreshToken(ReqRes refreshTokenRequest){
        ReqRes response = new ReqRes();
        try {
            String ourEmail = jwtUtils.extractUsername(refreshTokenRequest.getToken());
            User user = usersRepo.findByEmail(ourEmail).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenRequest.getToken() , user)){
                var jwt = jwtUtils.generateToken(user);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("1Hr");
                response.setMessage("Successfully refreshed token");
            }
            response.setStatusCode(200);
            return response;
        }catch (Exception e)
        {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    public ReqRes getUserById(long id){
        ReqRes response = new ReqRes();
        try {
            User user = usersRepo.findById(id).orElseThrow();
            response.setUser(user);
            response.setStatusCode(200);
            response.setMessage("Хэрэглэгч олдлоо");
            return response;
        }catch (Exception exception){
            response.setStatusCode(500);
//            response.setMessage("Хэрэглэгч хайхад алдаа гарлаа");
            response.setMessage(exception.getMessage());
        }
        return response;
    };

    public ReqRes updateUserProfile(Long userId, ReqRes request) throws Exception {
        User user = usersRepo.findById(userId)
                .orElseThrow(() -> new Exception("Хэрэглэгч олдсонгүй"));

        User reqUser = request.getUser();
        if(reqUser != null){
            if(reqUser.getFirstName() != null) user.setFirstName(reqUser.getFirstName());
            if(reqUser.getLastName() != null) user.setLastName(reqUser.getLastName());
            if(reqUser.getAge() != null) user.setAge(reqUser.getAge());
            if(reqUser.getGender() != null) user.setGender(reqUser.getGender());
            if(reqUser.getImage() != null) user.setImage(reqUser.getImage());
        }

        usersRepo.save(user);

        ReqRes res = new ReqRes();
        res.setUser(user);
        return res;
    }



}
