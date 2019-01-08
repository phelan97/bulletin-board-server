const List = require('../../models/board');
const mongoose = require('mongoose');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const userId = mongoose.Types.ObjectId(decodedToken.user.id);
  const boardId = mongoose.Types.ObjectId(args.boardId);
  const lists = await List.find({userId, boardId: boardId});
  return lists;
}