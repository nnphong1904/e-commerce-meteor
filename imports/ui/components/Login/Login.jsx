import React, {useState, useContext} from 'react';
import {Meteor} from 'meteor/meteor';
import './Login.css';

const LoginForm = (props)=>{ 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('');
  const onChangeHandler = (e, setState)=>{
      setState(e.target.value);
  }

  const goHomePage = (e)=>{
    if (e.target.id === `overlay`) props.setDisplayLoginForm(false);
  }

  const onSubmit = (e)=>{
    e.preventDefault();
    console.log({email,password});
    Meteor.loginWithPassword(email,password,(err)=>{
     if (err){
       setErrorMsg('Your e-mail/password is invalid');
       return;
     }
     else {
       console.log(Meteor.user());
       props.setDisplayLoginForm(false);
     }
    });
    setEmail('');
    setPassword('')
  }

  const content = (
    <div onClick={e=>goHomePage(e)}  className="overlay">
     <div id="overlay" className="container">
        <form onSubmit={(e)=>onSubmit(e)} className="form">
          <div>Log In</div>
          {errorMsg && <div className="err-msg">{errorMsg}</div>}
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
              <input className="check-boxed" type="checkbox"/>
              <span className="check-mark"></span>
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