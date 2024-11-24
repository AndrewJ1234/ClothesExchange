import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useUser } from '../context/UserContext';

function Categories() {
//   const { username } = useParams();  // Extract username from URL
  const [categories, setCategories] = useState([]); 
  const { username } = useUser();

//   useEffect(() => {
//     axios.get(`http://localhost:20943/api/users/categories/${username}`)
//       .then(response => {
//         console.log('Categories for', username, response.data);
//         setCategories(response.data);
//       })
//       .catch(error => {
//         if (error.response && error.response.status === 404) {
//           console.error(`Categories not found for username: ${username}`);
//         } else {
//           console.error('Error fetching categories:', error);
//         }
//       });
//   }, [username]);
  

  return (
    <>
         <Navbar/>
        <div className='h-screen flex items-start justify-center'>
            <div className="text-base sm:text-2xl mb-4 mt-20">
            <h2 className="text-base text-black">{username} Categories</h2>

            </div>
        </div>
    </>
  );
}

export default Categories;
