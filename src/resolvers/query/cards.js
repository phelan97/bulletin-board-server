const Card = require('../../models/card');
const mongoose = require('mongoose');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const userId = mongoose.Types.ObjectId(decodedToken.user.id);
  const listId = mongoose.Types.ObjectId(args.listId);
  const cards = await Card.find({userId, listId});
  return cards.map(card => card.toObject());
}