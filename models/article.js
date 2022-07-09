const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 400,
    required: true,
    index: 'text'
  },
  subtitle: {
    type: String,
    minlength: 5
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 5000,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  category: {
    type: String,
    enum: ['sport', 'games', 'history'],
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Article', ArticleSchema);