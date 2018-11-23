const Card = require('../../models/card');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();

}