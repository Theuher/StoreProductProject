package com.tgldr.userRegistersystem.repository;

import com.tgldr.userRegistersystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepo extends JpaRepository<User , Long> {

    Optional<User> findByEmail(String email);
}
