const Board = require('../../models/board');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const board = await Board.findOneAndUpdate({userId: decodedToken.user.id, _id: args.boardId},
    {title: args.title}, {new: true});
  return board.toObject();
}