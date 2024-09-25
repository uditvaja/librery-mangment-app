import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import BookList from '../components/BookList';
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleCreateBook = () => {
    navigate('/book');
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          E-Library Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateBook}
        >
          Create Book
        </Button>
      </Box>
      <TextField
        variant="outlined"
        label="Search Books"
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: '1rem', width: '100%' }}
      />
      <BookList books={filteredBooks} />
    </Container>
  );
};

export default HomePage;
