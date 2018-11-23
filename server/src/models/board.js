const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const boardSchema = new mongoose.Schema({
  title: {type: String, required: true},
  userId: {type: ObjectId, ref: 'User', required: true}
});

boardSchema.set('toObject', {
  versionKey: false,
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    return result;
  }
});

module.exports = mongoose.model('Board', boardSchema);