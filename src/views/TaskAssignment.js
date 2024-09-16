import React, { useState } from 'react';
import './styles/TaskAssignment.css';

const TaskAssignment = ({ workers, tasks, addTask, updateTask, deleteTask }) => {
  const [selectedWorker, setSelectedWorker] = useState('');
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Track if editing a task
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null); // Track index of task being edited

  // Handle worker selection change
  const handleWorkerChange = (e) => {
    setSelectedWorker(e.target.value);
    resetTaskForm();
  };

  // Handle new task input change
  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  // Handle add or update task
  const handleSaveTask = () => {
    if (newTask && selectedWorker) {
      if (isEditing) {
        // Update existing task
        updateTask(selectedWorker, currentTaskIndex, newTask);
      } else {
        // Add new task
        addTask(selectedWorker, newTask);
      }
      resetTaskForm();
    }
  };

  // Reset task input form
  const resetTaskForm = () => {
    setNewTask('');
    setIsEditing(false);
    setCurrentTaskIndex(null);
  };

  // Handle edit task
  const handleEditTask = (task, index) => {
    setNewTask(task);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  return (
    <div className="task-assignment-container">
      <h1>Task Assignment</h1>
      <div className="dropdown-container">
        <select value={selectedWorker} onChange={handleWorkerChange}>
          <option value="" disabled>Select a Worker</option>
          {workers.map((worker) => (
            <option key={worker.id} value={`${worker.firstName} ${worker.lastName}`}>
              {worker.firstName} {worker.lastName}
            </option>
          ))}
        </select>
      </div>
      {selectedWorker && (
        <div className="task-input-container">
          <input
            type="text"
            value={newTask}
            onChange={handleNewTaskChange}
            placeholder="Enter new task"
          />
          <button onClick={handleSaveTask}>
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      )}
      {selectedWorker && tasks[selectedWorker] && (
        <div className="task-queue">
          <h2>Tasks for {selectedWorker}</h2>
          <ul>
            {tasks[selectedWorker].map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => handleEditTask(task, index)}>Edit</button>
                <button onClick={() => deleteTask(selectedWorker, index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskAssignment;
