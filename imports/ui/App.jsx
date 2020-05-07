import React, { useState } from 'react';
import { Info } from './components/Info.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import LoginForm from './components/Login/Login.jsx';
import RegisterForm from './components/Register/Register.jsx';
import Thumbnail from './components/Thumbnail/Thumbnail.jsx';

export const App = () => {
  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  const content = (
  <div>
    <Navbar setDisplayLoginForm={setDisplayLoginForm} setDisplayRegisterForm={setDisplayRegisterForm} />
    {displayLoginForm && <LoginForm  setDisplayLoginForm={setDisplayLoginForm}/>}
    {displayRegisterForm && <RegisterForm setDisplayRegisterForm={setDisplayRegisterForm} setDisplayLoginForm={setDisplayLoginForm}/>}
    <Thumbnail/>
  </div>);
  return content;
}
