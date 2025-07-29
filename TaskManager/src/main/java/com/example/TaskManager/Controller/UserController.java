

package com.example.TaskManager.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TaskManager.Model.User;
import com.example.TaskManager.Repository.UserRepository;
import com.example.TaskManager.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {
@Autowired
private UserService service;
@Autowired
private UserRepository repo;

  public UserController(UserService service, UserRepository repo) {
    this.service = service;
    this.repo = repo;
  }

  @RequestMapping("/hello")
  public String hello() {
    return "Hello from Task Manager";
  }


 @PostMapping("/register")
  public User RegisterUser(@RequestBody User user){
    System.out.println("User Creating");
    return service.RegisterUser(user);
  }

  @PostMapping("/login")
  public ResponseEntity<?> LoginUser(@RequestBody User user){

    System.out.println("User Logging in");
    String token = service.LoginUser(user);
    if("failed".equals(token)){
      return ResponseEntity.status(401).body("login failed, please check your credentials");
    }
    User foundUser =repo.findByUsername(user.getUsername());
    if(foundUser == null) {
      return ResponseEntity.status(404).body("User not found");
    }

    Map<String, Object> response = new HashMap<>();
    response.put("token", token);
    response.put("user", foundUser);
    return ResponseEntity.ok(response);
  }


    
}
