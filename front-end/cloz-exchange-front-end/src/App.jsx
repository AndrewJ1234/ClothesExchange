import { useState, useEffect,  } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {Router, Routes, Route, useLocation, useParams, useNavigate } from "react-router-dom";
import MyShops from "./pages/MyShops";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import Product from './pages/Product'
import LoginPage from "./pages/LoginPage";
import Trades from './pages/Trades'
import Profile from './pages/Profile'
import { UserProvider } from './context/UserContext';

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  useEffect(() => {
    async function getUsername(){
      const res = await fetch('/login');
      const data = await res.json();
      setUsername(data.slug);
    }
    console.log('slug', username);
    getUsername();
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
  }
  

  console.log("Navbar username:", username);  // Debugging log
  const showNavbar = location.pathname !== "/" && username;

  return (
    <>
    <UserProvider>
        {showNavbar && username && <Navbar username={username} onSignOut={handleSignOut} />}
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:username" element={<Categories />} />
          <Route path="/myshops/:username" element={<MyShops />} />
          {/* <Route path="/product" element={<Product />} /> */}
          <Route path="/login" element={<LoginPage onSignIn={handleSignIn}/>} />
          <Route path="/trades/:username" element={<Trades />} />
          <Route path="/register" element={<Register onSignIn={handleSignIn}/>} />
          <Route path="/profile" element={<Profile />} />
          {  console.log("down below Navbar username:", username) }
        </Routes>
      </UserProvider>
    </>
  );
}
export default App;
