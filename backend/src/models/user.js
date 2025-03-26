import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});



export default mongoose.model('User', UserSchema);
