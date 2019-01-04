const mongoose = require('mongoose');
const List = require('../../models/list');
const ObjectId = mongoose.Types.ObjectId;

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const list = await List.create({
    userId: decodedToken.user.id,
    boardId: args.boardId,
    title: args.title
  });
  return list.toObject();
}