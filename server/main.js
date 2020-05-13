import { Meteor } from 'meteor/meteor';
import {addProduct, fetchProduct} from '../imports/api/method/product'
import {addUser, getCurrentUser} from '../imports/api/method/user';
import  UsersCollection  from '../imports/api/user';


Meteor.startup(() => {
  Meteor.methods({
    fetchUser :  async (condition)=>{
      const result = await UsersCollection.find(condition).fetch();
      return result;
    },
    addProduct,
    fetchProduct,
    addUser,
    getCurrentUser
  })
});
 
