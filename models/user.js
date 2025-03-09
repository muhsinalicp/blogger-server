import {Schema , model} from "mongoose";

const UserSchema = new Schema({
  username: 
  { 
    type: String, 
    required: true, 
    unique: true 
},
  email: 
  { 
    type: String, 
    required: true, 
    unique: true 
},
  password: 
  { 
    type: String, 
    required: true 
},
  imageUrl: 
  {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  }

}, { timestamps: true });

const User = model("User", UserSchema);

export default User;