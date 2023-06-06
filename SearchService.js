import React, { useState } from 'react';
import axios from 'axios';

const ServiceSearch = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3002/service/getservices', {
        params: {
          title,
          description,
          tags,
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error('Error retrieving services:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Tags:</label>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />

        <button type="submit">Search</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((service) => (
            <tr key={service._id}>
              <td>{service.title}</td>
              <td>{service.description}</td>
              <td>{service.tags.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceSearch;
