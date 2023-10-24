import logo from './logo.svg';
import './App.css';
import { Link, Routes, useState } from 'react-router-dom'
import Register from './authentication/Register';
import Login from './authentication/login';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">Register</Link><br></br>
        <Link to="/login">Login</Link>
        <Routes>
         <Route path="/" exact element={<Register />}>Register</Route>
          <Route path="/login" exact element={<Login />}>login</Route>
        </Routes>


      </BrowserRouter>
    </div>
  );
}

export default App;
