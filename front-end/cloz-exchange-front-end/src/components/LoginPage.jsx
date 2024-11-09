import React, { useState } from "react";
import Login, { Render } from "react-login-page";
// import Logo from 'react-login-page/logo';
import { useNavigate } from "react-router";
import axios from "axios";
import VisiblePassword from "../components/VisiblePassword";
import './LoginPage.css'

const LoginPage = () => {
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [fields, setFields] = useState({ username: "", password: "" });
  const loginURL = `http://localhost:3000/login`;
  const handleLogin = () => {
    const formErrors = {};
    let formIsValid = true;
     // Name validation
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
    // console.log('formErrors' + formErrors)
    setErrors(formErrors);
    return formIsValid;
  };

  // Send data function
  const sendData = () => {
    axios
      .post(loginURL, fields) // Adjust URL as needed
      .then((res) => {
        console.log("Data sent successfully:", res.data);
        console.log(343);
        navigate(`/:${fields['username']}`); // Redirect upon successful login
      })
      .catch((err) => {
        console.log("Error:", err.response ? err.response.data : err.message);
      });
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleLogin()) {
      sendData();
      console.log('Data sent')
      navigate(`/:${fields['username']}`);
    } else {
      console.log("Form has errors.");
    }
  };

  // Handle field changes
  const handleChange = (field, value) => {
    setFields({
      ...fields,
      [field]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Login Form</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={fields.username}
          onChange={(e) => handleChange("username", e.target.value)}
          required
        />
        <span className="error">{errors.username}</span>
      </div>
      <div>
        <VisiblePassword
          name="password"
          disabled={false}
          value={fields["password"]}
          handleChange={handleChange}
          //   errors={errors}
        />
        {/* <input
            type="password"
            placeholder="Password"
            value={fields.password}
            onChange={(e) => handleChange('password', e.target.value)}
            required
          /> */}
        <span className="error">{errors.password}</span>
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </div>
      <p>
        Not a member? <a href="#">Register</a>
      </p>
    </form>
  );
};

export default LoginPage;
