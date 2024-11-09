import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Chats from './pages/Chats'
import Myshops from './pages/Myshops'
import Register from './pages/Register'
import Categories from './pages/Categories'
import Home from './pages/Home';

function App() {

  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
        {/* element={<Home/>} */}
          <Route path='/' element={<Register/>} />
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/chats' element={<Chats/>} />
          <Route path='/myshops' element={<Myshops/>} />
          <Route path="/:username" element={<Home />}/>
          {/* <Route path='/register'  /> */}
        </Routes>
        </Router>
    </>
    )
}

export default App
