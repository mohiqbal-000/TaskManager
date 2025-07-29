package com.example.TaskManager.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.TaskManager.Model.Priority;
import com.example.TaskManager.Model.Task;
import java.time.LocalDate;


@Repository
public interface TaskRepository extends JpaRepository <Task,Integer> {
   

    @Query("SELECT t FROM Task t WHERE "+
        "LOWER(t.taskName) LIKE LOWER(CONCAT('%',:keyword,'%'))  OR " +
        "LOWER(t.taskDescription) LIKE LOWER(CONCAT('%',:keyword,'%')) "
        )      

    List<Task> searchTasks(String keyword);     

    List<Task> findByPriority(Priority priority);


    List<Task> findByTaskDueDate(LocalDate taskDueDate);
    List<Task> findByTaskStatus(boolean taskStatus);
    List<Task> findByUserId(Integer userid);
}
