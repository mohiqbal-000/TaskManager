package com.example.TaskManager.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.TaskManager.Model.User;
import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    User findByUsername(String username);

}
