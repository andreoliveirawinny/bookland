import React from 'react';
import { isFunction, map, isEmpty, filter, orderBy } from 'lodash';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';

import AutoSuggestion from '../components/autosuggestion';
import Book from '../components/generic/book';

const Title = ({ text }) => <h2>{text}</h2>;

const headerStyle = { width: '15em', background: '#8445840f' };

const Header = ({ text }) => (
  <div style={headerStyle} className="flex items-center justify-center">
    <Title text={text} />
  </div>
);

export default function Appp() {
  const [loading, setLoading] = React.useState(false);
  const [fullBooks, setFullBooks] = React.useState([]);

  const sortedFullBooks = React.useMemo(() => orderBy(fullBooks, ['publishedDate']), [fullBooks]);
  
  const fetchBooks = ({ ignoreLoading = false } = {}) => {
    (async () => {
      if(!ignoreLoading) setLoading(true);

      const response = await fetch(`http://localhost:4000/api/books`);

      const savedBooks = await response.json();

      console.log('savedBooks', savedBooks);

      setFullBooks(savedBooks);

      if(!ignoreLoading) setLoading(false);
    })();
  };

  // component did mount
  React.useEffect(fetchBooks, []);

  const onDeleteBook = React.useCallback(() => fetchBooks({ ignoreLoading: true }), []);

  const outNow = filter(sortedFullBooks, ({ publishedDate }) => moment(publishedDate).isBetween(moment().subtract(7, 'd'), moment()));
  const coming = filter(sortedFullBooks, ({ publishedDate }) => moment(publishedDate).isBetween(moment(), moment().add(180, 'd')));

  return (
    <div>
      <AutoSuggestion
        onSuggestionClick={newBook => setFullBooks([...fullBooks, newBook])}
      />

      <div className="pt3">
        {loading ? (
          <CircularProgress style={{ marginTop: '3em' }} size={100}/>
        ) : (
          <React.Fragment>

            {!isEmpty(outNow) &&
              <Grid className="pb3" container spacing={2}>
                <Header text="Just came out" />
                
                {map(
                  outNow,
                  ({
                    id, title, author, publisher, publishedDate, description, pageCount, imageLinks, ISBN_10
                  }) => (
                    <Grid key={ISBN_10} item xs={4}>
                      <Book
                        id={id}
                        ISBN_10={ISBN_10}
                        title={title}
                        author={author}
                        publisher={publisher}
                        publishedDate={publishedDate}
                        description={description}
                        pageCount={pageCount}
                        imageLinks={imageLinks}
                        onDelete={onDeleteBook}
                      />
                    </Grid>
                  ))
                }
              </Grid>
            }
            
            <Grid className="pb3" container spacing={2}>
              <Header text="Upcoming books" />

              {map(
                coming,
                ({
                  id, title, author, publisher, publishedDate, description, pageCount, imageLinks, ISBN_10
                }) => (
                  <Grid key={ISBN_10} item>
                    <Book
                      id={id}
                      ISBN_10={ISBN_10}
                      title={title}
                      author={author}
                      publisher={publisher}
                      publishedDate={publishedDate}
                      description={description}
                      pageCount={pageCount}
                      imageLinks={imageLinks}
                      onDelete={onDeleteBook}
                    />
                  </Grid>
                ))
              }
            </Grid>
          </React.Fragment>
        )}
      </div>

    </div>
  );
}
