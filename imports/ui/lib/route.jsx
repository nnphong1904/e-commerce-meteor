import React from 'react';
import {mount} from 'react-mounter';
import Info from '../components/Info';
import Login from '../components/Login';
import RegisterForm from '../components/Register/Register';
import {App} from '../App';
FlowRouter.route('/',{
  name:'home',
  action(){
    mount(()=><App/>,{});
  }
})
// FlowRouter.route('/login',{
//   name:'login',
//   action(){
//     mount(()=><Login />,{});
//   }
// })

// FlowRouter.route('/register',{
//   name:'login',
//   action(){
//     mount(()=><RegisterForm />,{});
//   }
// })