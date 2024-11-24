import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import VisiblePassword from "../components/VisiblePassword";
import { useLocalStorage } from '../components/LocalStorage';
import { useUser } from '../context/UserContext';

// Used this YouTube video as a reference for creating the login page: 
// https://www.youtube.com/watch?v=vWcyisPuTOA


// https://www.linkedin.com/pulse/implementing-slugs-react-using-useparams-hook-adyatan-guragain-1jmsc/ for the slug 
const LoginPage = () => {
  const { username, setUsername, signOut } = useUser();
  // console.log("onSignIn in LoginPage:", onSignIn);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [fields, setFields] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  
  const loginURL = `${import.meta.env.VITE_BACKEND_URL2}/api/users/login`;


   // Use useLocalStorage to store username and slug
   const { saveItem: saveUsername } = useLocalStorage('username', '');
   const { saveItem: saveSlug } = useLocalStorage('slug', '');

   const handleUserLogin = (username) => {
    setUsername(username);
  };

  const handleSignOut = () => {
    signOut();
    console.log("Signed out successfully");
  };


  const handleLogin = () => {
    const formErrors = {};
    let formIsValid = true;

    // Username validation
    if (!fields.username) {
      formIsValid = false;
      formErrors.username = "Cannot be empty";
    } else if (!fields.username.match(/^[a-zA-Z0-9]{8,}$/)) {
      formIsValid = false;
      formErrors.username = "Username must be at least 8 characters and contain only letters and numbers";
    }

    // Password validation
    if (!fields.password) {
      formIsValid = false;
      formErrors.password = "Cannot be empty";
    } else if (!fields.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)) {
      formIsValid = false;
      formErrors.password = "Password must be at least 8 characters long, contain a number, and a special character (!@#$%^&*)";
    }

    setErrors(formErrors);
    return formIsValid;
  };

  const sendData = () => {
    axios
      .post(loginURL, fields, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        handleSignOut
        const {username: loggedInUsername, slug}  = res.data.user;
        // localStorage.setItem('username', slug);
        saveUsername(loggedInUsername);
        handleLogin(username);
        saveSlug(slug);
        if (slug) {
          // Navigate to the user's page
          // navigate(`/${slug}`);
          navigate(`/`);
        } else {
          console.error('Slug is undefined');
        }

        // if (onSignIn) {
        //   onSignIn({ slug });
        // } else {
        //   console.error("onSignIn is not defined");
        // }

        console.log(res.data)
      })
      .catch((err) => {
        console.log("Error:", err);
        if (err.response) {
          console.log("Response error:", err.response.data);
        } else {
          console.log("Error message:", err.message);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleLogin()) {
      sendData();
    }
  };

  const handleChange = (field, value) => {
    setFields({
      ...fields,
      [field]: value,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">Login</h2>
        
        {/* Username field */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={fields.username}
            onChange={(e) => handleChange("username", e.target.value)}
            className="w-full bg-white p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
        </div>

        {/* Password field */}
        <div className="mb-4">
          <VisiblePassword
            name="password"
            disabled={false}
            value={fields["password"]}
            handleChange={handleChange}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full p-3 bg-white border-gray-800 text-black rounded-md hover:border-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
          >
            Login
          </button>
        </div>

        {/* Redirect to Register page */}
        <div className="text-center">
          <span className="text-sm text-black text-">Don't have an account? </span>
          <button
            type="button"
            className="text-black font-semibold"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
