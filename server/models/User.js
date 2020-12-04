import mongoose from 'mongoose';

const {Schema, model, Types} = mongoose;
import AdMessage from "./adMessage.js";

const UserSchema = Schema({
  login: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  links: [{ type: Types.ObjectId, ref: AdMessage}]

})

const User = model('user', UserSchema);

export default User;