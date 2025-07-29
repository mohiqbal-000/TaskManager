package com.example.TaskManager.Model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String taskName;
    private String taskDescription;
    private boolean taskStatus;
    private LocalDate taskDueDate;
    private Priority priority;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
     private User user;

    public Task() {} // Required by JPA

    public Task(Integer id, String taskName, String taskDescription, boolean taskStatus, LocalDate taskDueDate,Priority priority,User user) {
        this.id = id;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.taskStatus = taskStatus;
        this.taskDueDate = taskDueDate;
        this.priority = priority;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public String getTaskName() {
        return taskName;
    }
    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskDescription() {
        return taskDescription;
    }
    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public boolean isTaskStatus() {
        return taskStatus;
    }
    public void setTaskStatus(boolean taskStatus) {
        this.taskStatus = taskStatus;
    }

    public LocalDate getTaskDueDate() {
        return taskDueDate;
    }
    public void setTaskDueDate(LocalDate taskDueDate) {
        this.taskDueDate = taskDueDate;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }
    public User getUser(){
        return user;

    }
    public void SetUser(User user){
        this.user = user;
    }
}
