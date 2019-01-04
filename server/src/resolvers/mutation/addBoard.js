const Board = require('../../models/board');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  console.log(decodedToken.user.id);
  const board = await Board.create({userId: decodedToken.user.id, title: args.title});
  return board.toObject();
}