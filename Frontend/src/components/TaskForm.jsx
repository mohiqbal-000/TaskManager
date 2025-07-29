import React, { useState } from 'react';
import './TaskForm.css'; // Make sure this file exists

const TaskForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    taskName: initialData.taskName || '',
    taskDescription: initialData.taskDescription || '',
    taskDueDate: initialData.taskDueDate || '',
    taskStatus: initialData.taskStatus || false,
    priority:initialData.priority || 'MEDIUM',  
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3 className="task-form-title">Task Form</h3>

      <div className="form-group">
        <label htmlFor="taskName">Title:</label>
        <input
          id="taskName"
          type="text"
          name="taskName"
          value={form.taskName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="taskDescription">Description:</label>
        <textarea
          id="taskDescription"
          name="taskDescription"
          value={form.taskDescription}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="taskDueDate">Due Date:</label>
        <input
          id="taskDueDate"
          type="date"
          name="taskDueDate"
          value={form.taskDueDate}
          onChange={handleChange}
        />
      </div>
       <div className="form-group">
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={form.priority}
          onChange={handleChange}
          required
        >
          <option value="HIGH">🔴 High</option>
          <option value="MEDIUM">🟡 Medium</option>
          <option value="LOW">🟢 Low</option>
        </select>
      </div>


      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="taskStatus"
            checked={form.taskStatus}
            onChange={handleChange}
          />
          Completed
        </label>
      </div>

      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default TaskForm;
