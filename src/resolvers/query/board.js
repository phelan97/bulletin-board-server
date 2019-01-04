const Board = require('../../models/board');
const User = require('../../models/user');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const user = await User.findById(decodedToken.user.id);
  if(!user) {
    throw('Unauthorized');
  }

  const board = await Board.findOne({userId: user.id, _id: args.boardId})
  if(!board) {
    throw('Could not find a board with the given id');
  }

  return board;
};