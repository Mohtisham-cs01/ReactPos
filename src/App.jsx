// src/App.js
import React from 'react';

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import ItemList from '../components/ItemList';
import Sales from '../components/Sales';
import Navbar from '../components/Navbar';
import Shop from '../components/Shop';


const App = () => {
  return (
    <>
   
    
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" exact element={<Shop/>} />
        <Route path="/items" exact element={<ItemList/>} />
        <Route path="/sales" element={<Sales/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
