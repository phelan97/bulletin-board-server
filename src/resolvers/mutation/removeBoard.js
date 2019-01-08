const Board = require('../../models/board');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  await Board.deleteOne({userId: decodedToken.user.id, _id: args.boardId});
}