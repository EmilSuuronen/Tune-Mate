import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./login/login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home/home";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/register" element={<Login/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
