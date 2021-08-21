import React from 'react';
import moment from 'moment';
import { Grid, Paper } from '@material-ui/core';
import { map } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { CardMedia } from '@material-ui/core';

import { fetchBooksForYear, selectBooks } from '../../slices/calendar'

const MONTHS = moment.months();
const MONTHS_DATA = map(MONTHS, (month, index) => {
  const id = index + 1;

  return ({
    id: id.toString(),
    text: month
  });
});

const Calendar = () => {
  const dispatch = useDispatch();

  // component did mount
  React.useEffect(() => {
    dispatch(fetchBooksForYear(moment().year()));
  }, [dispatch]);

  const books = useSelector(selectBooks);

  console.log('books', books);
  console.log('MONTHS_DATA', MONTHS_DATA);

  const currentYear = moment().year();

  return (
    <div>
      CALENNDARRR {currentYear}

      <h3>{currentYear}</h3>

      <Grid className="pb3" container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>

            {MONTHS_DATA.map(({ id, text }) => (
              <Grid key={id} item>
                <Paper style={{ width: '25em', height: '25em' }}>
                  <h5>{text}</h5>

                  <hr />

                  {map((books[id.length === 1 ? `0${id}` : id] || {}).books, ({ title, imageLinks = {} }) => (
                    <React.Fragment>
                      <p key={id}>
                        <CardMedia
                          image={imageLinks.thumbnail}
                          title={title}
                          style={{ minWidth: '11em', width: 151 }}
                        />

                        {title}
                      </p>
                    </React.Fragment>
                  ))}
                </Paper>
              </Grid>
            ))}

          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Calendar;
