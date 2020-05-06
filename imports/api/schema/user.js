
import SimpleSchema from 'simpl-schema';
const UserSchema = new SimpleSchema({
  email: {
    type: String,
    required: [true, 'what is your email?']  
   },
  password: {
    type: String,
    required: [true, 'what is your password?']  
   },
  name: {
    type: String,
    required: [true, 'what is your name?']  
   },
  role: {
    type: String,
    required: [true, 'Are you seller or customer?'],

   }
});

export default UserSchema;