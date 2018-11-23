const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const cardSchema = new mongoose.Schema({
  content: {type: String, required: true},
  userId: {type: ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Card', cardSchema);
