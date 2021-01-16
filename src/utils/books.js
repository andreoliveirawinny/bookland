import { map, find, get } from 'lodash';

export const transformBook = ({
  id,
  volumeInfo: {
    title, subtitle, authors = [], imageLinks, publishedDate, publisher, pageCount, industryIdentifiers
  } = {}
} = {}) => ({ id,
  title,
  subtitle,
  author: authors[0],
  imageLinks,
  publishedDate,
  publisher,
  pageCount,
  ISBN_13: get(find(industryIdentifiers, { type: 'ISBN_13' }), 'identifier'),
  ISBN_10: get(find(industryIdentifiers, { type: 'ISBN_10' }), 'identifier')
});

export const transformBooks = books => map(books, transformBook);