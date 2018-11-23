const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = async (root, args) => {
  const user = await User.findOne({email: args.email});
  if(!user) {
    // username doesn't match
    throw('Invalid credentials');
  }
  console.log(user.password);
  console.log(args.password);
  const isMatchingPassword = await bcrypt.compare(args.password, user.password);
  if(!isMatchingPassword) {
    // invalid password for the given user
    throw('Invalid credentials');
  }
  return jwt.sign({user}, process.env.JWT_SECRET);
}