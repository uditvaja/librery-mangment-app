import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Checkbox, FormControlLabel, Container, Box, Typography, Card, CardContent } from '@mui/material';

const BookForm = ({ id, onSuccess }) => {
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
    available: false,
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) {
        // If no ID, clear the form for adding a new book
        setBookDetails({
          title: '',
          author: '',
          genre: '',
          publicationDate: '',
          available: false,
        });
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookDetails(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookDetails({
      ...bookDetails,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        const response = await axios.put(`http://localhost:5000/api/books/${id}`, bookDetails, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Book updated successfully');
        onSuccess(response.data);
      } else {
        const response = await axios.post(`http://localhost:5000/api/books`, bookDetails, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Book added successfully');
        onSuccess(response.data);
      }
    } catch (error) {
      console.error('Error submitting book:', error);
      alert('Failed to submit the book');
    }
  };

  const handleDelete = async () => {
    if (!id) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Book deleted successfully');
      onSuccess(); // Trigger update after deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card variant="outlined" sx={{ padding: 2 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#6200ea' }}>
            {id ? 'Edit Book' : 'Add New Book'}
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              value={bookDetails.title}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Author"
              variant="outlined"
              name="author"
              value={bookDetails.author}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Genre"
              variant="outlined"
              name="genre"
              value={bookDetails.genre}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Publication Date"
              variant="outlined"
              type="date"
              name="publicationDate"
              value={bookDetails.publicationDate.split('T')[0]} // Extract the date part
              onChange={handleChange}
              InputLabelProps={{ shrink: true }} // For proper date label display
              required
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={bookDetails.available}
                  onChange={handleChange}
                  name="available"
                  color="primary"
                />
              }
              label="Available"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ textTransform: 'none' }}
              >
                {id ? 'Update Book' : 'Add Book'}
              </Button>
              {id && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDelete}
                  sx={{ textTransform: 'none' }}
                >
                  Delete Book
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookForm;
