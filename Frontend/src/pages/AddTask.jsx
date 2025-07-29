 import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import './AddTask.css'; // Add this line to import your page-specific CSS

const API_URL = 'http://localhost:8080/api/create';

const AddTask = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {

    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if(!userStr || !token){
      alert("you must be logged in to add a task");
      return;
    }
    let user;
     try {
      user = JSON.parse(userStr);
    } catch (err) {
      console.error("Invalid user data:", err);
      alert("Error reading user data.");
      return;
    }

    const taskWithUser= {
      ...formData,
      user: {id:user.id,},

    };
    try {

    const res =  await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' ,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(taskWithUser),
    });
      if (res.status === 401) {
        alert("Unauthorized: Invalid or missing token");
        return;
      }
    navigate('/');
        } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task");
    }

  };

  return (
    <div className="add-task-container">
      <h2 className="add-task-title">Add New Task</h2>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddTask;
