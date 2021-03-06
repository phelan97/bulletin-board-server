const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (root, args) => {
  const hash = await bcrypt.hash(args.password, 10);
  const user = await User.create({email: args.email, password: hash});
  return jwt.sign({user}, process.env.JWT_SECRET);
}