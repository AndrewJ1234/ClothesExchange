import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserCategories = () => {
  const { username } = useParams();  // Retrieve username from URL
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`/api/users/${username}/categories`)  // Fetch categories data based on the username
      .then((response) => {
        setCategories(response.data);  // Set the categories data
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, [username]);  // Re-fetch data if username changes

  return (
    <div>
      <h1>{username}'s Categories</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserCategories;
