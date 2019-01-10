const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = async (root, args) => {
  const {DEMO_EMAIL: email, DEMO_PASSWORD: password} = process.env;
  if(!email || !password) {
    throw('Could not log into the demo account. Server variables are not set');
  }
  const user = await User.findOne({email});
  if(!user) {
    // create demo account if it doesn't already exist
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({email, password: hash});
    return jwt.sign({user}, process.env.JWT_SECRET);
  }
  const isMatchingPassword = await bcrypt.compare(password, user.password);
  if(!isMatchingPassword) {
    // invalid password for the given user
    throw('Invalid credentials');
  }
  return jwt.sign({user}, process.env.JWT_SECRET);
}