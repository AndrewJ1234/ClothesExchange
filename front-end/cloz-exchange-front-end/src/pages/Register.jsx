import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import VisiblePassword from "../components/VisiblePassword";
import LoginPage from './LoginPage';
import { useLocalStorage } from '../components/LocalStorage';


// https://www.youtube.com/watch?v=ZVyIIyZJutM used as reference for creating register/login page
function Register(onSignIn) {
  const [isLogin, setIsLogin] = useState(true);
  const [fields, setFields] = useState({
    username: '',
    email: '',
    password: '',
    clothesToTrade: [],
    profession: ''
  });

   // Use useLocalStorage to store username and slug
   const { saveItem: saveUsername } = useLocalStorage('username', '');
   const { saveItem: saveSlug } = useLocalStorage('slug', '');

  const [errors, setErrors] = useState({});

  const url = `${import.meta.env.VITE_BACKEND_URL2}/api/users/register`;

  let navigate = useNavigate();
  const sendData = () => {
    axios
      .post(url, fields)
      .then((res) => {
        console.log("Data sent successfully:", res.data);
        const {slug, username: loggedInUsername } = res.data;
        // localStorage.setItem('username', slug);
        saveUsername(loggedInUsername);
        saveSlug(slug);
        if (slug) {
          // Navigate to the user's page
          navigate(`/${slug}`);
        } else {
          console.error('Slug is undefined');
        }

        if (onSignIn) {
          onSignIn({ username, slug });
        } else {
          console.error("onSignIn is not defined");
        }

      })
      .catch((err) => {
        console.log(fields);
        console.log("Error:", err.response ? err.response.data : err.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      sendData();
    } else {
      console.log("Form has errors.");
    }
  };

  const handleValidation = () => {
    const formErrors = {};
    let formIsValid = true;

    if (!fields.username) {
      formIsValid = false;
      formErrors.username = "Cannot be empty";
    } else if (!fields.username.match(/^[a-zA-Z0-9]{8,}$/)) {
      formIsValid = false;
      formErrors.username = "Username must be at least 8 characters and contain only letters and numbers";
    }

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-lg  text-black p-6 bg-white border border-black rounded-lg shadow-md overflow-auto">
        {isLogin ? (
          <>
            <LoginPage onSignIn={onSignIn} />
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-black text-center">Register</h2>

                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => handleChange("username", e.target.value)}
                    value={fields["username"]}
                    className="w-full p-3 border bg-white border-black rounded-md focus:outline-none"
                  />
                  <span className="text-red-500 text-sm">{errors["username"]}</span>
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => handleChange("email", e.target.value)}
                    value={fields["email"]}
                    className="w-full p-3 border bg-white border-black rounded-md focus:outline-none"
                  />
                  <span className="text-red-500 text-sm">{errors["email"]}</span>
                </div>

                <div className="space-y-2">
                  <VisiblePassword
                    name="password"
                    disabled={false}
                    value={fields["password"]}
                    handleChange={handleChange}
                  />
                  <span className="text-red-500 text-sm">{errors['password']}</span>
                </div>

                <h4 className="mt-4 text-lg font-semibold text-black">What are you looking to trade?</h4>
                <div className="space-y-2">
                  <label className="block text-black">
                    <input
                      type="checkbox"
                      name="fashion_position"
                      value="pants"
                      onChange={(e) => handleChange('clothesToTrade', e.target.value)}
                      className="mr-2"
                    />
                    Pants
                  </label>
                  <label className="block text-black">
                    <input
                      type="checkbox"
                      name="fashion_position"
                      value="shirts"
                      onChange={(e) => handleChange('clothesToTrade', e.target.value)}
                      className="mr-2"
                    />
                    Shirts
                  </label>
                  <label className="block text-black">
                    <input
                      type="checkbox"
                      name="fashion_position"
                      value="jackets"
                      onChange={(e) => handleChange('clothesToTrade', e.target.value)}
                      className="mr-2"
                    />
                    Jackets
                  </label>
                </div>

                <h4 className="mt-4 text-lg font-semibold text-black">
                  Are you interested in fashion or involved in clothing design?
                </h4>
                <div className="space-y-2">
                  <label className="block text-black">
                    <input
                      type="radio"
                      name="profession"
                      onChange={(e) => handleChange("profession", e.target.value)}
                      value="amateur"
                      className="mr-2"
                    />
                    Amateur
                  </label>
                  <label className="block text-black">
                    <input
                      type="radio"
                      name="profession"
                      onChange={(e) => handleChange("profession", e.target.value)}
                      value="in_training"
                      className="mr-2"
                    />
                    In Training
                  </label>
                  <label className="block text-black">
                    <input
                      type="radio"
                      name="profession"
                      onChange={(e) => handleChange("profession", e.target.value)}
                      value="professional"
                      className="mr-2"
                    />
                    Professional
                  </label>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full p-3 border border-black text-black bg-white rounded-md hover:bg-gray-100 focus:outline-none"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </>
        )}

        <div className="mt-6 text-center">
          <button
            className={isLogin ? "text-purple-500 font-semibold bg-white border-gray-700": ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <span className="mx-4">|</span>
          <button
            className={!isLogin ? "text-purple-500 font-semibold bg-white border-gray-700" : ""}
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
