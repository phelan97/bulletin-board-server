const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true}
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, result) => {
    delete result.password;
    return result;
  }
});