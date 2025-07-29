package com.example.TaskManager.Controller;  // fixed package name

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.TaskManager.Model.Priority;
import com.example.TaskManager.Model.Task;
import com.example.TaskManager.service.TaskService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class TaskController {  // fixed class name
    @Autowired
    private TaskService service;

    @GetMapping("/tasks")  // removed trailing space
    public List<Task> getAllTasks() {
        System.out.println("good Working");
        return service.getAllTasks();
    }
    @PostMapping("/create")
    public Task createTask(@RequestBody Task task){

        System.out.println("Task Created");
       return service.createTask(task);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable int id){
        System.out.println("Task Deleted");
        service.deleteTask(id);
    }

    @PutMapping("/update/{id}")
public ResponseEntity <String>  updateTask(@PathVariable int id,@RequestBody Task task){

     Task task1 = service.updateTask(id,task);
     if(task1 != null){
         return new ResponseEntity<>("Updated Successfully",HttpStatus.OK);
     } else {
         return new ResponseEntity<>("Task not found", HttpStatus.NOT_FOUND);
     }
}
   @GetMapping("/update/{id}")  
    public ResponseEntity<Task> getTaskById(@PathVariable int id){
        Task task = service.getTaskById(id);
        if(task != null){
            return new ResponseEntity<>(task,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
   @GetMapping("/tasks/search")  // fixed endpoint
       public List<Task> SearchTasks(@RequestParam String keyword){

        System.out.println("Searching for tasks with keyword: " + keyword);


        return service.SearchTasks(keyword);
       }
    @GetMapping("tasks/priority")
     public List<Task> getTasksByPriority(@RequestParam Priority priority){
        System.out.println("Fetching tasks with priority: " + priority);
        return service.getTasksByPriority(priority);
       
     }

    @GetMapping("tasks/dueDate")
     public List<Task> getTasksByDueDate(@RequestParam  
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate taskDueDate){
        System.out.println("Fetching tasks with due date: "+ taskDueDate   );
        return service.getTasksByDueDate(taskDueDate);
     }

     @GetMapping("tasks/status")
     public List<Task> getTaskByStatus(@RequestParam boolean taskStatus){
        System.out.println("Fetching tasks with status: "+  taskStatus);
        return service.getTasksByStatus(taskStatus);
     }

     @GetMapping("tasks/user/{userId}")
     public List<Task> getTasksByUser(@PathVariable Integer userId){
        return service.getTasksByUser(userId);
     }
}