const Board = require('../../models/board');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const boards = await Board.find({userId: decodedToken.user.id});
  return boards;
}