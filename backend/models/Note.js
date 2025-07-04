const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', NoteSchema);
