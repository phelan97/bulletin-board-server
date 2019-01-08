const List = require('../../models/board');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  await List.deleteOne({userId: decodedToken.user.id, _id: args.listId});
}