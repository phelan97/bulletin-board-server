const List = require('../../models/list');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  // const boardId = mongoose.Types.ObjectId(args.boardId);
  const list = await List.findOne({userId: decodedToken.user.id, _id: args.listId});
  return list;
}