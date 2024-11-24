import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserShop = () => {
  const { username } = useParams();  // Retrieve username from URL
  const [shopItems, setShopItems] = useState([]);

  useEffect(() => {
    axios.get(`/api/users/${username}/myshop`)  // Fetch shop data based on the username
      .then((response) => {
        setShopItems(response.data);  // Set the shop items data
      })
      .catch((error) => {
        console.error('Error fetching shop items:', error);
      });
  }, [username]);  // Re-fetch data if username changes

  return (
    <div>
      <h1>{username}'s Shop</h1>
      <ul>
        {shopItems.map((item, index) => (
          <li key={index}>{item.name} - {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserShop;
