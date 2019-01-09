const List = require('../../models/list');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const test = await List.deleteOne({userId: decodedToken.user.id, _id: args.listId});
  return args.listId;
}