const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const cardSchema = new mongoose.Schema({
  content: {type: String, required: true},
  listId: {type: ObjectId, ref: 'List', required: true},
  userId: {type: ObjectId, ref: 'User', required: true}
});

cardSchema.set('toObject', {
  versionKey: false,
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    return result;
  }
});

module.exports = mongoose.model('Card', cardSchema);
