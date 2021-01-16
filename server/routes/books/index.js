const express = require('express');
const { isEmpty } = require('lodash');

const router = express.Router();

const Book = require('../../models/book');

router.get('/', async function(req, res) {
  const books = await Book.find();

  return res.json(books);
});

router.delete('/:id', async function(req, res) {
  const { id } = req.params;

  await Book.deleteOne({ id });

  return res.json({ result: 1 });
});

router.post('/', async function(req, res, next) {
  const bookReq = req.body;
  const {
    id, title, author, subtitle, imageLinks, publishedDate,
    publisher, pageCount, ISBN_13, ISBN_10
  } = bookReq;

  console.log('>>> bookReq', bookReq);

  // VALIDATION //

  try {
    let book = await Book.find({ $or: [{ ISBN_13 }, { ISBN_10 }]  });

    if(!isEmpty(book)) throw new Error('This title is already in use.');

    const newBook = new Book({
      id, title, author, subtitle, imageLinks, publishedDate,
      publisher, pageCount, ISBN_13, ISBN_10
    });
  
    await newBook.save();

    console.log('newBook', newBook);
  
    return res.json(newBook);
  } catch (err) {
    return res.status(422).json({
      error: 'Could not save book'
    });
  }
});

module.exports = router;
