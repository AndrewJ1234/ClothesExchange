import { useState, useEffect,  } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {Router, Routes, Route, useLocation, useParams, useNavigate } from "react-router-dom";
// import Chats from './pages/Chats'
import MyShops from "./pages/MyShops";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import UserShops from './pages/UserShop'
import UserCategories from './pages/UserCategories'
import Product from './pages/Product'
import LoginPage from "./pages/LoginPage";
import Trades from './pages/Trades'
import Profile from './pages/Profile'
import { UserProvider } from './context/UserContext';

function App() {
  // used https://www.youtube.com/watch?v=I2UBjN5ER4s to help me with the routing of the pages
  // const showNavbar = location.pathname !== "/";
  // const showNavbar = location.pathname !== "/" && username;
  // const username = localStorage.getItem("username") || "guest";
// if (username === "guest") {
  // console.warn("Username is not set. Redirecting to login.");
  // navigate("/register");
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && storedUsername !== username) {
      setUsername(storedUsername); // Sync state with localStorage
    }
  }, [username]);

  const handleSignOut = () => {
    // Clear username from state and localStorage on sign-out
    localStorage.removeItem("username");
    setUsername('');
    navigate("/register");
  };

  const handleSignIn = (newUsername) => {
    localStorage.setItem("username", newUsername);
    setUsername(newUsername);
   // navigate(`/${newUsername}`); // Redirect to the user's home page
  }

  //   const handleSignIn = (user) => {
  //   console.log("User signed in:", user);
  //   setCurrentUser(user);
  // };
  

  console.log("Navbar username:", username);  // Debugging log
  const showNavbar = location.pathname !== "/" && username;

  // console.log('localstorage', username);

  return (
    <>
    <UserProvider>
        {/* <Navbar/> */}
        {showNavbar && username && <Navbar username={username} onSignOut={handleSignOut} />}
          {/* element={<Home/>} */}
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:username" element={<Categories />} />
          <Route path="/myshops/:username" element={<MyShops />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<LoginPage onSignIn={handleSignIn}/>} />
          <Route path="/trades/:username" element={<Trades />} />
          <Route path="/register" element={<Register onSignIn={handleSignIn}/>} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/" element={<Home />} />
          <Route path="/categories/:username" element={<Categories />} />
          <Route path="/myshops/:username" element={<MyShops />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/trades" element={<Trades />} /> */}
          {/* <Route path="/:username/profile" element={<Profile />} /> */}
          {/* <Route path='/register'  /> */}
          {  console.log("down below Navbar username:", username) }
        </Routes>
      </UserProvider>
    </>
  );
}
export default App;
