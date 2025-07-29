import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import './EditTask.css'; // Optional styling

const API_URL = 'http://localhost:8080/api/update';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem('token');
  if(!token){
          console.error("No token found. Unauthorized.");
    return;
  }
    // Fetch the task details
    fetch(`${API_URL}/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setTaskData(data))
      .catch((err) => console.error('Failed to load task', err));
  }, [id]);

  const handleSubmit = async (formData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found. cannot update task.");
      return;
    }
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' ,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });
    navigate('/');
  };

  if (!taskData) return <div>Loading...</div>;

  return (
    <div className="edit-task-container">
      <h2 className="edit-task-heading">Edit Task</h2>
      <TaskForm initialData={taskData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditTask;
