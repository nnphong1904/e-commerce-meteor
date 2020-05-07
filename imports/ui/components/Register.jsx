import React, {useState} from 'react';
import {Meteor} from 'meteor/meteor';
import '../assets/css/Login.css';
import '../assets/css/Register.css';

const RegisterForm = (props)=>{ 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const onChangeHandler = (e, setState)=>{
      setState(e.target.value);
  }

  const goHomePage = (e)=>{
    if (e.target.id === `overlay`) FlowRouter.go('/');
  }

  const onSubmit = (e)=>{
    e.preventDefault();
    console.log({email,password,name});
    // Meteor.loginWithPassword(email,password,(err)=>{
    //  if (err){
    //    setErrorMsg('Your e-mail/password is invalid');
    //    return;
    //  }
    //  else {
    //    console.log(Meteor.user());
    //    FlowRouter.go('/');
    //  }
    // });
    setEmail('');
    setPassword('')
    setName('');
  }

  const content = (
    <div onClick={e=>goHomePage(e)}  className="overlay">
     <div id="overlay" className="login-container">
        <form onSubmit={(e)=>onSubmit(e)} className="form register-form">
          <div>Register</div>
          {errorMsg && <div className="err-msg">{errorMsg}</div>}
          <label className="label-name">
            <div>Name</div>
            <input 
            value={name}
            onChange={(e)=>onChangeHandler(e,setName)}
            className="name" 
            type="text" 
            name="name" 
            placeholder="Enter your name..."/>
          </label>
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
          <div className="policy">By creating an account your agree to the <i>Terms of service</i> and <i>Privacy Policy</i></div>
          <button className="submit-register-form">Register</button>
          <div className="have-account">Do you have account? <i>Log in</i></div>
        </form>
     </div>
    </div>
  )
  return content;
}

export default RegisterForm;