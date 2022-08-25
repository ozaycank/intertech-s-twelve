import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import AdminScreen from './pages/AdminScreen';
import ChildScreen from './pages/ChildScreen';
import ParentScreen from './pages/ParentScreen';

import {BrowserRouter as Router,Routes, Route, Link} from "react-router-dom";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Child" element={<ChildScreen/>}/>
        <Route path="/Parent" element={<ParentScreen/>}/>
        <Route path="/Admin" element={<AdminScreen/>}/>
     </Routes>
    </>
  );
}

export default App;
