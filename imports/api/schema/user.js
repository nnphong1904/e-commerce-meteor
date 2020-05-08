
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
  profile: {
    type: String,
    required: [true, 'what is your name?']  
   }
});

export default UserSchema;