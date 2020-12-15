import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const RoleSchema = Schema({
  value: {type: String, unique: true, default: "USER"}
})

const Role = model('Role', RoleSchema);

export default Role;