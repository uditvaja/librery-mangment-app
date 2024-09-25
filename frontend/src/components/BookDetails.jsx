import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';

const BookDetails = ({ book }) => {

  const handleBorrow = async (id) => {
    // Logic for borrowing
  };

  const handleReturn = async (id) => {
    // Logic for returning
  };

  return (
    <Card
      sx={{
        height: '100%',  // Make all cards the same height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
        backgroundColor: book.status === 'borrowed' ? '#f5f5f5' : 'white',
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold', color: '#1976D2' }}>
          {book.title}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '8px' }}>
          Author: {book.author}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Genre: {book.genre}
        </Typography>
        
        {book.status === 'borrowed' ? (
          <Chip label="Unavailable" color="error" sx={{ mt: 2 }} />
        ) : (
          <Chip label="Available" color="success" sx={{ mt: 2 }} />
        )}
      </CardContent>
      <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleBorrow(book._id)}
          disabled={book.status === 'borrowed'}
          sx={{ textTransform: 'none' }}
        >
          Borrow
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleReturn(book._id)}
          disabled={book.status === 'available'}
          sx={{ textTransform: 'none' }}
        >
          Return
        </Button>
      </Box>
    </Card>
  );
};

export default BookDetails;
