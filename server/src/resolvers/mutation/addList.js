const List = require('../../models/list');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const list = await List.create({userId: decodedToken.user.id, boardId: args.boardId, title: args.title});
  return list;
}