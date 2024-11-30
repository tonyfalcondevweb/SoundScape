import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Model Account
const accountSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// crypt le mdp
accountSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const round = 10;
    this.password = await bcrypt.hash(this.password, round);
  }
  next();
});

// exec de la requete
const Account = model('Account', accountSchema);

export default Account;
