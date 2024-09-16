// src/App.js

import React, { useState } from 'react';
import './App.css';
import Supervisor from './views/supervisor';
import TaskAssignment from './views/TaskAssignment';
import Navbar from './components/Navbar/Navbar';
import { v4 as uuidv4 } from 'uuid';  // Import uuid library

function App() {
  // State for workers and tasks
  const [workers, setWorkers] = useState([
    { id: uuidv4(), firstName: 'Kumar', lastName: 'Abrol', email: 'ka@example.com', rate: 5 },
    { id: uuidv4(), firstName: 'Prashant', lastName: 'Chahar', email: 'pc@example.com', rate: 4 },
    { id: uuidv4(), firstName: 'Himanshu', lastName: 'Soni', email: 'hs@example.com', rate: 3 },
    { id: uuidv4(), firstName: 'Siddhi', lastName: 'Kulkarni', email: 'sk@example.com', rate: 3 },
  ]);
  const [tasks, setTasks] = useState({});
  const [currentView, setCurrentView] = useState('supervisor'); // default view

  // Function to add a new worker
  const addWorker = (worker) => {
    setWorkers([...workers, { ...worker, id: uuidv4() }]);  // Assign a unique ID to each new worker
  };

  // Function to update an existing worker
  const updateWorker = (updatedWorker) => {
    setWorkers(workers.map((worker) => (worker.id === updatedWorker.id ? updatedWorker : worker)));
  };

  // Function to delete a worker
  const deleteWorker = (id) => {
    setWorkers(workers.filter((worker) => worker.id !== id));
  };

  // Function to add a task for a specific worker
  const addTask = (workerName, task) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [workerName]: [...(prevTasks[workerName] || []), task],
    }));
  };

  // Function to delete a task for a specific worker
  const deleteTask = (workerName, taskIndex) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [workerName]: prevTasks[workerName].filter((_, index) => index !== taskIndex),
    }));
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const updateTask = (workerName, taskIndex, newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [workerName]: prevTasks[workerName].map((task, index) =>
        index === taskIndex ? newTask : task
      ),
    }));
  };
  
  


  return (
    <div>
      <header>
        <Navbar onNavigate={handleNavigation} />
      </header>

      {currentView === 'supervisor' && (
        <Supervisor
          workers={workers}
          addWorker={addWorker}
          updateWorker={updateWorker}  // Pass the updateWorker function
          deleteWorker={deleteWorker}
        />
      )}

{currentView === 'tasks' && (
    <TaskAssignment
      workers={workers}
      tasks={tasks}
      addTask={addTask}
      deleteTask={deleteTask}
      updateTask={updateTask} // Pass update function here
    />
  )}

    </div>



);



}

export default App;
