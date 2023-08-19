import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Route ,Routes} from "react-router-dom"
import './App.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';

function App() {
  return (
    <Router>
    <div className="App">
      <ToastContainer/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addedit" element={<AddEdit/>}/>
      <Route path="/update/:id" element={<AddEdit/>}/>
      <Route path="/view/:id" element={<View/>}/>
      </Routes>
        
         
   
    </div>
    </Router>
  );
}

export default App;
