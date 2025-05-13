// backend/models/User.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: String
});
const User = mongoose.model('User', userSchema);
//export default model('User', userSchema);
export default User;