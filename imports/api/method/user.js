import { Accounts } from 'meteor/accounts-base';
export const addUser = (newUser)=>{
  try{
    Accounts.createUser(newUser);
    return {success: true, msg: 'add success'};
  }
  catch(err){
    return {success: false, msg: 'can not add success', error:err};
  }
}