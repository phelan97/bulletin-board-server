const List = require('../../models/board');
const mongoose = require('mongoose');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  console.log(decodedToken.user.id);
  console.log(args.boardId);
  const userId = mongoose.Types.ObjectId(decodedToken.user.id);
  const boardId = mongoose.Types.ObjectId(args.boardId);
  const userLists = await List.find({userId});
  console.log(userLists);
  const listFromBoard = await List.find({boardId});
  //console.log(listFromBoard);
  const lists = await List.find({userId, boardId: boardId});
  console.log(lists);
  return lists;
}