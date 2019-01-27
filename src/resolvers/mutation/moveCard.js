const Card = require('../../models/card');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  // TODO: validate listId
  const card = await Card.findOneAndUpdate({userId: decodedToken.user.id, _id: args.cardId},
    {listId: args.listId}, {new: true});
  return card.toObject();
}