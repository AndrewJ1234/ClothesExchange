import "./Register.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import VisiblePassword from "../components/VisiblePassword";
import LoginPage from '../components/LoginPage';

function Register() {

  const [isLogin, setIsLogin] = useState(true);
  const [fields, setFields] = useState({
    username: '',
    email: '',
    password: '',
    clothesToTrade: [],
    profession: ''
  });
  const [errors, setErrors] = useState({});

const url = `${import.meta.env.VITE_BACKEND_URL2}/register`;
console.log(url)

// const url = 'http://localhost:20943/register';

 // https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page, used this article to find a way to navigate back to home screen when user logged in or registered
  // navigate back to home page when finished registering
  let navigate = useNavigate();
  const routeChange = () => {
    let path = (`/:${fields['username']}`);
    navigate(path);
  };

  // sends data to the backend
  const sendData = () => {
    axios
      .post(url, fields)
      .then((res) => {
        console.log("Data sent successfully:", res.data);
        navigate(`/:${fields['username']}`);
      })
      .catch((err) => {
        console.log(fields)
        console.log("Error:", err.response ? err.response.data : err.message);
      });
  };
  // actually sends the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
        sendData();
      } else {
        console.log("Form has errors.");
      }
  };

  // https://stackoverflow.com/questions/41296668/how-do-i-add-validation-to-the-form-in-my-react-component, used this article to create a function that does client-side validation so that the user can register properly
const handleValidation = () => {
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
  
    // Email validation
    if (!fields.email) {
      formIsValid = false;
      formErrors.email = "Cannot be empty";
    } else {
      const lastAtPos = fields.email.lastIndexOf("@");
      const lastDotPos = fields.email.lastIndexOf(".");
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.email.indexOf("@@") === -1 && lastDotPos > 2 && fields.email.length - lastDotPos > 2)) {
        formIsValid = false;
        formErrors.email = "Email is not valid";
      }
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

  const handleChange = (field, value) => {
    setFields({
      ...fields,
      [field]: value,
    });
  };

  const contactSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      alert("Form submitted");
    } else {
      alert("Form has errors.");
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      clothesToTrade: checked
        ? [...prevFields.clothesToTrade, value]
        : prevFields.clothesToTrade.filter((item) => item !== value)
    }));
  };

  const handleRadioButton = (e) => {
    setFields({
      ...fields,
      profession: e.target.value
    });
  };

  // https://www.youtube.com/watch?v=vWcyisPuTOA, used this as a guide to build a register form page, mainly to understand how to use react
  // https://stackoverflow.com/questions/41296668/how-do-i-add-validation-to-the-form-in-my-react-component, for the fields and errors to show if the user has validated all information needed to register and create an account
  return (
    <div className="container">
      <div className="form-container">
        {isLogin ? (
          <>
          <LoginPage/>
          </>
        ) : (
          <>
            <form
              method="POST"
              action="register"
              onSubmit={(e) => contactSubmit(e)}
            >
              <div className="form">
                <h2>Register</h2>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => handleChange("username", e.target.value)}
                  value={fields["username"]}
                />
                <span className="error">{errors["username"]}</span>

                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => handleChange("email", e.target.value)}
                  value={fields["email"]}
                />
                <span className="error">{errors["email"]}</span>
                <div className='visiblePassSection'>
                <VisiblePassword
                  name="password"
                  disabled={false}
                  value={fields["password"]}
                  handleChange={handleChange}
                //   errors={errors}
                />
                <span className="error">{errors['password']}</span>
                 </div>

                <h4>What are you looking to trade?</h4>
                <div className="clothingToTrade">
                  <div className="clothingToTrade">
                    <input
                      type="checkbox"
                      name="fashion_position"
                      value="pants"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="pants">Pants</label>
                    <br />
                    <input
                      type="checkbox"
                      name="fashion_position"
                      value="shirts"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="shirts">Shirts</label>
                    <br />
                    <input
                      type="checkbox"
                      name="fashion_position"
                      value="jackets"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="jackets">Jackets</label>
                    <br />
                  </div>
                </div>

                <h4>
                  Are you interested in fashion or involved in clothing design?
                </h4>
                <div className="fashion_position">
                  <input
                    type="radio"
                    name="fashion_position"
                    id="amateur"
                    onChange={handleRadioButton}
                    value="amateur"
                  />
                  <label htmlFor="amateur">Amateur</label>
                  <br></br>
                  <input
                    type="radio"
                    name="fashion_position"
                    id="in_training"
                    onChange={handleRadioButton}
                    value="in_training"
                  />
                  <label htmlFor="in_training">In Training</label>
                  <br></br>
                  <input
                    type="radio"
                    name="fashion_position"
                    id="professional"
                    onChange={handleRadioButton}
                    value="professional"
                  />
                  <label htmlFor="professional">Professional</label>
                  <br></br>
                  <button onClick={handleSubmit}>Register</button>
                </div>
              </div>
            </form>
          </>
        )}
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
