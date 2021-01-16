const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  id: String,
  title: String,
  author: String,
  subtitle: String,
  imageLinks: Object,
  publishedDate: String,
  publisher: String,
  pageCount: Number,
  ISBN_13: String,
  ISBN_10: String
}, { timestamps: true });

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
