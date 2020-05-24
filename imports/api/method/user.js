import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

// import UsersCollection from '../users';
export const addUser = (newUser)=>{
  try{
    const existedUserEmail = Meteor.users.find({'emails.address': newUser.email}).count();
    
    if (existedUserEmail > 0){
      return {success: false, msg: 'email is already exist', status:403};  
    }
    Accounts.createUser(newUser);
    
    return {success: true, msg: 'add success', status:200};
  }
  catch(err){
    return {success: false, msg: 'can not add success', error:err};
  }
}
export const isEmailAdmin = async (email='')=>{
  if (email === ''){
    return false;
  }
  const matchUser = await Meteor.users.findOne({emails:{$elemMatch:{address: email}}});
  const matchUserId = matchUser._id;
  return Roles.userIsInRole(matchUserId, 'admin');
}
export const isAdmin = async (user)=>{
  if (user === undefined){
    return false;
  }
  return  Roles.userIsInRole(user, 'admin')
}
export const getCurrentUser = async ()=>{
  try{
      const result = Meteor.user();
      return {success: true, data: result};
  }
  catch(err){
    return {success: false, err: err};
  }
}