import React from 'react';
import { Grid } from '@mui/material';
import BookDetails from './BookDetails';

const BookList = ({ books }) => {
  return (
    <Grid container spacing={3}>
      {books.length > 0 ? (
        books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
            <BookDetails book={book} />
          </Grid>
        ))
      ) : (
        <p>No books found</p>
      )}
    </Grid>
  );
};

export default BookList;
