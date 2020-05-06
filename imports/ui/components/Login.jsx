import React, {useState, createRef} from 'react';
import {Meteor} from 'meteor/meteor';
import '../assets/css/Login.css';
const LoginForm = (props)=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const onChangeHandler = (e, setState)=>{
      setState(e.target.value);
  }

  const goHomePage = (e)=>{
    if (e.target.id === `overlay`) FlowRouter.go('/');
  }

  const onSubmit = (e)=>{
    e.preventDefault();
    console.log({email,password});
    Meteor.loginWithPassword(email,password,(err)=>{
      console.log(err);
    });
    setEmail('');
    setPassword('')
  }

  const content = (
    <div onClick={e=>goHomePage(e)}  className="login-overlay">
     <div id="overlay" className="login-container">
        <form onSubmit={(e)=>onSubmit(e)} className="login-form">
          <div>Log In</div>
          <label className="label-email" >
            <div>Email</div>
            <input 
              value={email} 
              onChange={(e)=>onChangeHandler(e,setEmail)} 
              className="email" 
              type="text" 
              name="email" 
              placeholder="Enter your email..."/>
          </label>
          <label className="label-password">
            <div>Password</div>
            <input 
            value={password}
            onChange={(e)=>onChangeHandler(e,setPassword)}
            className="password" 
            type="password" 
            name="password" 
            placeholder="Enter your password..."/>
          </label>
          <div className="password-extension">
            <label className="remember-password">
              <input className="check-remember" type="checkbox"/>
              <span>Remember Password</span>  
            </label>
            <div>Forgot your password?</div>
          </div>
          <button className="submit-login-form">Log In</button>
        </form>
     </div>
    </div>
  )
  return content;
}

export default LoginForm;