import React, { useState, Children } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import LoginForm from './components/Login/Login.jsx';
import RegisterForm from './components/Register/Register.jsx';
import Footer from './components/Footer/Footer.jsx';

export const App = ({component}) => {
  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  console.log('App rendering...');
  const content = (
  <>
     <Navbar setDisplayLoginForm={setDisplayLoginForm} setDisplayRegisterForm={setDisplayRegisterForm} />

    {displayLoginForm && <LoginForm  setDisplayLoginForm={setDisplayLoginForm}/>}
    {displayRegisterForm && <RegisterForm setDisplayRegisterForm={setDisplayRegisterForm} setDisplayLoginForm={setDisplayLoginForm}/>}
    {component}
    <Footer/>
  </>);
  return content;
}
