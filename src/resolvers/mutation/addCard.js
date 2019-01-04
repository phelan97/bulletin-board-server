const Card = require('../../models/card');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const card = await Card.create({userId: decodedToken.user.id, listId: args.listId,  content: args.content});
  return card.toObject();
}