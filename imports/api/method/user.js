import { Accounts } from 'meteor/accounts-base';
// import UsersCollection from '../users';
export const addUser = (newUser)=>{
  try{
    Accounts.createUser(newUser);
    return {success: true, msg: 'add success'};
  }
  catch(err){
    return {success: false, msg: 'can not add success', error:err};
  }
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