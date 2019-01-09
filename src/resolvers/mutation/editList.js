const List = require('../../models/list');

module.exports = async (root, args, context) => {
  const decodedToken = context.isAuthorized();
  const list = await List.findOneAndUpdate({userId: decodedToken.user.id, _id: args.listId},
    {title: args.title}, {new: true});
  return list.toObject();
}