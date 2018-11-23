const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const boardSchema = new mongoose.Schema({
  title: {type: String, required: true},
  lists: [{type: ObjectId, ref: 'List'}],
  userId: {type: ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.Model('Board', boardSchema);