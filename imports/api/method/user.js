import UserCollection from '../user';
export const addUser = (newUser)=>{
  try{
    UserCollection.insert(addUser);
    return {success: true, msg: 'add success'};
  }
  catch(err){
    return {success: false, msg: 'can not add success', error:err};
  }
}