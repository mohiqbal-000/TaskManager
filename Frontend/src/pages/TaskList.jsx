import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ FIXED
import './TaskList.css';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const API_URL = 'http://localhost:8080/api/tasks';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTask, setSearchTask] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchAllTasks = async () => {
const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log("DEBUG: user string =", userStr);
console.log("DEBUG: token =", token);
  let user;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    console.error("Failed to parse user:", e);
    user = null;
  }



    if (!user || !user.id || !token) {
      console.error("user not logged in or token missing");
      setTasks([]);
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/api/tasks/user/${user.id}`,{
        headers: {
          'Authorization':`Bearer ${token}`
        },
      }); // ✅ FIXED 
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setTasks([]);
    }
  };

  const fetchByType = async (type, value) => {
    if (!value) {
      fetchAllTasks();
      return;
    }

    let url = `${API_URL}`;
    switch (type) {
      case 'keyword':
        url = `${API_URL}/search?keyword=${encodeURIComponent(value)}`;
        break;
      case 'priority':
        url = `${API_URL}/priority?priority=${encodeURIComponent(value)}`;
        break;
      case 'dueDate':
        url = `${API_URL}/dueDate?taskDueDate=${encodeURIComponent(value)}`;
        break;
      case 'status':
        url = `${API_URL}/status?taskStatus=${encodeURIComponent(value)}`;
        break;
      default:
        url = `${API_URL}`;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(url,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchTask(keyword);
    fetchByType('keyword', keyword);
  };

  const handleDueDateChange = (e) => {
    const dueDate = e.target.value;
    setDueDateFilter(dueDate);
    fetchByType('dueDate', dueDate);
  };

  const handlePriorityChange = (e) => {
    const priority = e.target.value;
    setPriorityFilter(priority);
    fetchByType('priority', priority);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    fetchByType('status', status);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:8080/api/delete/${id}`, { method: 'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`,
      }
     }); // ✅ FIXED
    fetchAllTasks();
  };

  const toggleComplete = async (task) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:8080/api/update/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' ,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ...task, taskStatus: !task.taskStatus }),
    });
    fetchAllTasks();
  };

  const renderPriorityBadge = (priority) => {
    let className = 'priority-badge ';
    if (priority === 'HIGH') className += 'priority-high';
    else if (priority === 'MEDIUM') className += 'priority-medium';
    else className += 'priority-low';
    return <span className={className}>{priority}</span>;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setTasks(reordered);
  };

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">📋 Task List</h2>

      <div className="task-list-header">
        <input
          type="text"
          placeholder="🔍 Search by title or description..."
          value={searchTask}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={priorityFilter}
          onChange={handlePriorityChange}
          className="priority-filter"
        >
          <option value="">All Priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <input
          type="date"
          value={dueDateFilter}
          onChange={handleDueDateChange}
          className="date-filter"
        />
        <select value={statusFilter} onChange={handleStatusChange} className="status-filter">
          <option value="">All Statuses</option>
          <option value="true">Completed</option>
          <option value="false">Incomplete</option>
        </select>
        <Link to="/create" className="add-task-btn">+ Add New Task</Link>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <li
                      className={`task-item ${snapshot.isDragging ? 'dragging' : ''}`} // ✅ FIXED
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div className="drag-handle" {...provided.dragHandleProps}>☰</div>
                      <div className={`task-content ${task.taskStatus ? 'completed' : ''}`}> {/* ✅ FIXED */}
                        <strong>{task.taskName} {renderPriorityBadge(task.priority)}</strong>
                        <p>{task.taskDescription}</p>
                        <small>Due: {task.taskDueDate || 'N/A'}</small>
                      </div>
                      <div className="task-actions">
                        <button onClick={() => toggleComplete(task)} className="btn btn-toggle">
                          {task.taskStatus ? 'Undo' : 'Complete'}
                        </button>
                        <Link to={`/update/${task.id}`} className="btn btn-edit">Edit</Link>
                        <button onClick={() => handleDelete(task.id)} className="btn btn-delete">Delete</button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
