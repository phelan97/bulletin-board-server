const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true}
});

userSchema.set('toObject', {
  versionKey: false,
  virtuals: true,
  transform: (doc, result) => {
    delete result.password;
    delete result._id;
    return result;
  }
});

userSchema.virtual('id').get(function () {
  return this._id.toString();
});

userSchema.set('toObject', {
  versionKey: false,
  virtuals: true,
  transform: (doc, result) => {
    delete result.password;
    delete result._id;
    return result;
  }
});

userSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: (doc, result) => {
    delete result.password;
    delete result._id;
    return result;
  }
});

module.exports = mongoose.model('User', userSchema);