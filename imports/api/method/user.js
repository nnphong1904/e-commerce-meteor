import { Accounts } from 'meteor/accounts-base';
// import UsersCollection from '../users';
export const addUser = (newUser)=>{
  try{
    const existedUserEmail = Meteor.users.find({'emails.address': newUser.email}).count();
    console.log(existedUserEmail);
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

export const getCurrentUser = async ()=>{
  try{
      const result = Meteor.user();
      return {success: true, data: result};
  }
  catch(err){
    return {success: false, err: err};
  }
}