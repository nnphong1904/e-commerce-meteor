import React, { useState } from 'react';
import { Info } from './components/Info.jsx';
import Navbar from './components/Navbar';
import LoginForm from './components/Login.jsx';
import RegisterForm from './components/Register.jsx';

export const App = () => {
  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  const content = (
  <div>
    <Navbar setDisplayLoginForm={setDisplayLoginForm} setDisplayRegisterForm={setDisplayRegisterForm} />
    {displayLoginForm && <LoginForm  setDisplayLoginForm={setDisplayLoginForm}/>}
    {displayRegisterForm && <RegisterForm setDisplayRegisterForm={setDisplayRegisterForm} setDisplayLoginForm={setDisplayLoginForm}/>}
  </div>);
  return content;
}
