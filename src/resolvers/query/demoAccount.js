const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = async (root, args) => {
  const {DEMO_EMAIL: email, DEMO_PASSWORD: password} = process.env;
  
  const user = await User.findOne({email});
  if(!user) {
    // username doesn't match
    throw('Could not log in to the demo account. Check server config and db');
  }
  const isMatchingPassword = await bcrypt.compare(password, user.password);
  if(!isMatchingPassword) {
    // invalid password for the given user
    throw('Could not log in to the demo account. Check server config and db');
  }
  return jwt.sign({user}, process.env.JWT_SECRET);
}