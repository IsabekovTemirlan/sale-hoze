import mongoose from 'mongoose';

const {Schema, model, Types} = mongoose;

const UserSchema = Schema({
  login: { type: String, required: true, unique: true, sparse:true},
  email: {type: String, required: true, unique: true, sparse:true},
  password: { type: String, required: true},
  links: [{ type: Types.ObjectId, ref: "AdMessage"}],
  roles: [{type: String, ref: "Role"}]
})

const User = model('user', UserSchema);

export default User;