import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from "./register/register";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home/home";
import {ApolloProvider} from "@apollo/client";
import client from "./graphql/apolloClient";
import Login from "./login/login";
import './styles/styles.css'

function App() {
  return (
      <div className="App">
          <ApolloProvider client={client}>
              <BrowserRouter>
                  <Routes>
                      <Route path="/register" element={<Register/>}/>
                      <Route path="/login" element={<Login/>}/>
                      <Route path="/" element={<Home/>}/>
                  </Routes>
              </BrowserRouter>
          </ApolloProvider>
      </div>
  );
}

export default App;
