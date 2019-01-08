const Card = require('../../models/card');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const card = await Card.findOneAndUpdate({userId: decodedToken.user.id, _id: args.cardId},
    {content: args.content}, {new: true});
  return card.toObject();
}