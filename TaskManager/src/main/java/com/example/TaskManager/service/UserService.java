package com.example.TaskManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.TaskManager.Model.User;
import com.example.TaskManager.Repository.UserRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;
    public User RegisterUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        System.out.println("User creating");
        return repo.save(user);
    }
    public String LoginUser(User user) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

         if(authentication.isAuthenticated())
         return jwtService.generateToken(user.getUsername());

         return "failed";
         
    //     User exitingUser = repo.findByUsername(user.getUsername());

    //     if(exitingUser != null && passwordEncoder.matches(user.getPassword(),  exitingUser.getPassword())){
    //          System.out.println("Found user: " + exitingUser.getUsername());
    // System.out.println("Entered password: " + user.getPassword());
    // System.out.println("Stored password: " + exitingUser.getPassword());


    //         return exitingUser;
    //     }else{
    //         System.out.println("Found user: " + exitingUser.getUsername());
    // System.out.println("Entered password: " + user.getPassword());
    // System.out.println("Stored password: " + exitingUser.getPassword());
    //         System.out.println("User not found or password mismatch");
    //         return null;
        }
    }
    
 
    
 

