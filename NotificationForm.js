import React, { useState } from 'react';
import axios from 'axios';

const NotificationForm = () => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/admin/sendnotification', { description });
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error sending notification:', error);
    }

    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group">
        <label htmlFor="description" className="fw-bold">Notification Description:</label>
        <textarea
          id="description"
          className="form-control"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter notification description"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">Send Notification</button>
    </form>
  );
};

export default NotificationForm;
