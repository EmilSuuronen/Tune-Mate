import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ApolloProvider} from "@apollo/client";
import client from "./graphql/apolloClient";
import './App.css';
import './styles/styles.css'
import DashBoard from "./dashboard/dashboard";
import Login from "./login/login";
import Home from "./Home/home";
import Register from "./register/register";
import TabCreator from "./tabCreator/tabCreator";


function App() {
  return (
      <div className="App">
          <ApolloProvider client={client}>
              <BrowserRouter>
                  <Routes>
                      <Route path="/register" element={<Register/>}/>
                      <Route path="/login" element={<Login/>}/>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/dashboard" element={<DashBoard/>}/>
                      <Route path="/tabCreator" element={<TabCreator/>}/>
                  </Routes>
              </BrowserRouter>
          </ApolloProvider>
      </div>
  );
}

export default App;
