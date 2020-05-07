import React from 'react';
import {mount} from 'react-mounter';
import App from '../App';
import LoginForm from '../components/Login';
import RegisterForm from '../components/Register';
FlowRouter.route('/',{
  name:'home',
  action(){
    mount(()=><div></div>,{});
  }
})
FlowRouter.route('/login',{
  name:'login',
  action(){
    mount(()=><LoginForm />,{});
  }
})

FlowRouter.route('/register',{
  name:'login',
  action(){
    mount(()=><RegisterForm />,{});
  }
})