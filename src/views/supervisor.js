// src/views/Supervisor.js

import React, { useState, useEffect } from 'react';
import './styles/Supervisor.css';

const Supervisor = ({ workers, addWorker, updateWorker, deleteWorker }) => {
  const [formData, setFormData] = useState({ id: '', firstName: '', lastName: '', email: '', rate: '' });
  const [isEditing, setIsEditing] = useState(false); // State to track if we are in edit mode

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle adding or updating a worker
  const handleSaveWorker = () => {
    if (formData.firstName && formData.lastName && formData.email && formData.rate) {
      if (isEditing) {
        // Update existing worker
        updateWorker(formData);
      } else {
        // Add new worker
        addWorker(formData);
      }
      resetForm(); // Reset the form after saving
    }
  };

  // Reset form state
  const resetForm = () => {
    setFormData({ id: '', firstName: '', lastName: '', email: '', rate: '' });
    setIsEditing(false);
  };

  // Handle editing a worker
  const handleEditWorker = (worker) => {
    setFormData(worker);
    setIsEditing(true);
  };

  return (
    <div className="supervisor-container">
      <h1>Supervisor View</h1>
      <h1>Welcome Matias Troccoli</h1>
      <div className="input-container">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rate"
          placeholder="Rate"
          value={formData.rate}
          onChange={handleChange}
        />
        <button onClick={handleSaveWorker}>
          {isEditing ? 'Update' : 'Save'}
        </button>
      </div>
      <table className='data-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.firstName}</td>
              <td>{worker.lastName}</td>
              <td>{worker.email}</td>
              <td>{worker.rate}</td>
              <td>
                <button onClick={() => handleEditWorker(worker)}>Edit</button>
                <button onClick={() => deleteWorker(worker.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Supervisor;
