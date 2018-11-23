const Board = require('../../models/board');
const List = require('../../models/list');
const Card = require('../../models/card');
const User = require('../../models/user');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const user = await User.findById(decodedToken.user.id);
  if(!user) {
    throw('Unauthorized');
  }

  const board = await Board.findOne({userId: user.id, id: args.boardId})
  if(!board) {
    throw('Could not find a board with the given id');
  }
  console.log(board);
  return 'authorized';
};