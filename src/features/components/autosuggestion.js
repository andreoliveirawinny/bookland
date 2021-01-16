import React from 'react';
import Autosuggest from 'react-autosuggest';
import { debounce, isEmpty } from 'lodash';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { searchByISBN, searchByTitle } from '../../google-api'
import { transformBooks } from '../../utils/books'
import theme from '../theme';

const fetchSuggestions = ({ setOptions, value }) => {
  // if (!loading) {
  //   return undefined;
  // }

  if(!value) return;

  (async () => {
    let books = [];

    books = await searchByISBN(value);

    const { items: isbnItems = [] } = books || {};

    console.log('Books returned from search: ', books)

    if(!isEmpty(isbnItems)) return setOptions(transformBooks(isbnItems));

    books = await searchByTitle(value);

    const { items: titleItems = [] } = books;

    if(isEmpty(titleItems)) return setOptions([]);

    setOptions(transformBooks(titleItems));
  })();
};

const debouncedFetchSuggestions = debounce(fetchSuggestions, 700);

const renderSuggestion = ({ title, subtitle, author, imageLinks = {}, publishedDate, publisher, pageCount, ISBN_13 }) => (
  <div>
    <ListItem key={ISBN_13} button>
      <ListItemAvatar>
        <Avatar src={imageLinks.thumbnail ||  `/static/images/avatar/1.jpg`} className={{ width: '70px', height: '106px', borderRadius: '0' }} />
      </ListItemAvatar>
      <ListItemText id={ISBN_13} primary={`${title} ${subtitle ? subtitle : ''}`} secondary={author} />
      <ListItemSecondaryAction>
        <div style={{ fontSize: '9px', textAlign: 'right', color: '#a99d90' }}>
          <span style={{ fontSize: '13px' }}>{publishedDate}</span>
          <br />
          {publisher}
          <br />
          {pageCount && `${pageCount} pages`}
        </div>
      </ListItemSecondaryAction>
    </ListItem>
  </div>
);

const AutoSuggestion = ({ onSuggestionClick }) => {
  const [loadiong, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [inputValue, setValue] = React.useState('');
  
  return (
    <Autosuggest
        suggestions={options}
        onSuggestionsFetchRequested={({ value }) => {
          
          debouncedFetchSuggestions({ value, setOptions });
        }}
        onSuggestionsClearRequested={() => setOptions([])}
        onSuggestionSelected={(e, { suggestion, suggestionValue }) => {
          console.log('ON suggestion click', suggestion, suggestionValue);

          (async () => {
            const {
              id, author, imageLinks, pageCount, publishedDate,
              publisher, subtitle, title, ISBN_13, ISBN_10
            } = suggestion;

            const response = await fetch(`http://localhost:4000/api/books`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id, author, imageLinks, pageCount, publishedDate,
                publisher, subtitle, title, ISBN_13, ISBN_10
              })
            });

            const book = await response.json();

            onSuggestionClick(book);
          })();
        }}
        getSuggestionValue={() => ''}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: 'search book',
          value: inputValue,
          onChange: (e, { newValue }) => setValue(newValue)
        }}
        theme={theme}
      />
  )
}

export default AutoSuggestion;