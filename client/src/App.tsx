import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from "./login/login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home/home";
import {ApolloProvider} from "@apollo/client";
import client from "./graphql/apolloClient";

function App() {
  return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/register" element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
