import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { username } = useParams();  // Extract username from URL
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile for this username
    axios.get(`http://localhost:20943/api/users/${username}`)
      .then(response => {
        setUserProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, [username]);

  if (!userProfile) return <div>Loading...</div>;

  return (
    <div>
      <h2>{userProfile.username}'s Profile</h2>
      <p>Email: {userProfile.email}</p>
      <p>Bio: {userProfile.bio}</p>
      {/* Add more user info as needed */}
    </div>
  );
}

export default Profile;
