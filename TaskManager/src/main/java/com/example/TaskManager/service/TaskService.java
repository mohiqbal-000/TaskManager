package com.example.TaskManager.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.TaskManager.Model.Priority;
import com.example.TaskManager.Model.Task;
import com.example.TaskManager.Repository.TaskRepository;

// com.example.TaskManager.Cotroller.Task;
@Service
public class TaskService {
    @Autowired
    private TaskRepository repo;

    public List<Task> getAllTasks() {
                System.out.println("good Working");


        return repo.findAll();

        
    }

    public Task createTask(Task task) {
        System.out.println(task);
        System.out.println("Task Created");
        return repo.save(task);
    }

    public void deleteTask(int id) {
        System.out.println("Task Deleted");
         repo.deleteById(id);
    }

    public Task  updateTask(int id, Task task) {
     Task existingTask = repo.findById(id).orElse(null);
       if(existingTask != null){
        existingTask.setTaskName(task.getTaskName());
        existingTask.setTaskDescription(task.getTaskDescription());
        existingTask.setTaskStatus(task.isTaskStatus());
        existingTask.setTaskDueDate(task.getTaskDueDate());
        existingTask.setPriority(task.getPriority());
        return repo.save(existingTask );
       } else{
           System.out.println("Task not found");
           return null;
       }

           }
   


    
    

    public Task getTaskById(int id) {
        return repo.findById(id).orElse(null);
        
    }

    public List<Task> SearchTasks(String keyword) {
        return repo.searchTasks(keyword);

     }

    public List<Task> getTasksByPriority(Priority priority) {

        return repo.findByPriority(priority);
       
    }

    public List<Task> getTasksByDueDate(LocalDate taskDueDate) {
        return repo.findByTaskDueDate(taskDueDate);
    }

    public List<Task> getTasksByStatus(boolean taskStatus) {
        return repo.findByTaskStatus(taskStatus);
      
    }

    public List<Task> getTasksByUser(Integer userId) {
        return repo.findByUserId(userId);
    }

   
}
    

