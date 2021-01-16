import { reduce, isEmpty } from 'lodash';

import { transformBook } from '../utils/books'

const URL = query => `https://www.googleapis.com/books/v1/volumes${query}`;

const searchByISBNUrl = value => URL(`?q=isbn:${value}`);
const searchByTitleUrl = value => URL(`?q=${value}`);

const search =  getUrl => async (value, { transform = false } = {}) => {
  if(!value) return [];

  console.log('---- SEARCH GOOGLE URL', getUrl(value));

  const response = await fetch(getUrl(value));

  let books = await response.json();

  console.log('SEARCH GOOGLE', books);

  if(transform) {
    books = reduce(books, (res, { items = [] }) => {
      if(isEmpty(items) || !items[0]) return res;
  
      res.push(transformBook(items[0]));
  
      return res;
    }, []);
  }

  console.log('SEARCH GOOGLE AFTER', books);

  return books;
};

export const searchByISBN = search(searchByISBNUrl);
export const searchByTitle = search(searchByTitleUrl);