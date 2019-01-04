const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const listSchema = new mongoose.Schema({
  title: {type: String, required: true},
  boardId: {type: ObjectId, ref: 'Board', required: true},
  userId: {type: ObjectId, ref: 'User', required: true}
});

listSchema.virtual('id').get(function () {
  return this._id.toString();
});

listSchema.set('toObject', {
  versionKey: false,
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    result.boardId = result.boardId.toString();
    result.userId = result.userId.toString();
    return result;
  }
});

module.exports = mongoose.model('List', listSchema);