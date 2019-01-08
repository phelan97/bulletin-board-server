const Card = require('../../models/card');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  await Card.deleteOne({userId: decodedToken.user.id, _id: args.cardId});
}