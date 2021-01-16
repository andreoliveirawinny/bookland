import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { DefaultButton, Image, Stack, Icon } from 'office-ui-fabric-react';
import { Text, ITextProps } from 'office-ui-fabric-react/lib/Text';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MenuBookIcon from '@material-ui/icons/MenuBook';

import Spinner from './spinner';

const goodreads = require('goodreads-api-node').default;

const myCredentials = {
  key: 'onhKHGu6oT54j0eP47uT3g',
  secret: 'onhKHGu6oT54j0eP47uT3g'
};
 
const gr = goodreads(myCredentials);

const subTitleColor = { color: 'grey' };

const useStyles = makeStyles(theme => ({
  root: { display: 'flex', height: '17em', position: 'relative' },
  details: { display: 'flex', flexDirection: 'column', },
  content: { flex: '1 0 auto', },
  cover: { width: 151, },
  controls: { paddingLeft: theme.spacing(2) },
  playIcon: { height: 38, width: 38, }
}));


export default function Book({
  id, ISBN_10, title, author, publisher, publishedDate,
  pageCount, imageLinks = {},
  onDelete
}) {
  const classes = useStyles();
  const [deleting, setDeleting] = React.useState(false);

  const deleteBook = React.useCallback(() => {
    (async () => {
      setDeleting(true);

      await fetch(`http://localhost:4000/api/books/${id}`, { method: 'DELETE' });

      onDelete();
    })();
  }, [id, onDelete]);

  const goToGoodreads = React.useCallback(() => {
    (async () => {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=onhKHGu6oT54j0eP47uT3g&q=${ISBN_10}`);

      // const res = await gr.searchBooks({ q: ISBN_10 });

      console.log('resresres', response)

      // console.log('response', response);

      if(response.ok) {
  
        const data = await response.json();
  
        console.log('AAAAA', data);
      }
    })();
  }, [ISBN_10]);

  return (
    <React.Fragment>
      <Card className={classes.root}>

        <Spinner loading={deleting}/>

        <CardMedia
          className={classes.cover}
          image={imageLinks.thumbnail}
          title={title}
          style={{ minWidth: '11em' }}
        />

        <div className={classes.details}>
          <CardContent className={classes.content} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <Text key={id} nowrap block>
                {title}
              </Text>
              <Text style={subTitleColor} key={id} nowrap block variant="smallPlus">
                {author}
              </Text>
              <hr />
            </div>
            <div>
              <Text style={subTitleColor} key={id} nowrap block variant="smallPlus">
                Pages: {pageCount}
              </Text>
              <Text style={subTitleColor} key={id} nowrap block variant="smallPlus">
                Publisher: {publisher}
              </Text>
              <Text style={subTitleColor} key={id} nowrap block variant="smallPlus">
                ISBN: {ISBN_10}
              </Text>

              <hr />
            </div>

            <Text className="center" style={subTitleColor} key={id} nowrap block variant="large">
              {publishedDate}
            </Text>

            
            <div className="flex justify-between">
              <DeleteIcon className="pointer" color="primary" onClick={deleteBook} />
              <VisibilityIcon className="pointer" color="primary" />
              <MenuBookIcon className="pointer" color="primary" onClick={goToGoodreads} />
            </div>
          </CardContent>
        </div>
      </Card>
    </React.Fragment>
  );
}