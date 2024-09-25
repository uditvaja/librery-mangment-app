  const Book = require('../models/Book');

  exports.createBook = async (req, res) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  exports.getBookById = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ error: 'Book not found' });
      res.json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.getBooks = async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.updateBook = async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.deleteBook = async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      res.json({ message: 'Book deleted' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.borrowBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book.available) return res.status(400).json({ error: 'Book is already borrowed' });
      book.available = false;
      book.borrowedBy = req.user.id;
      await book.save();
      res.json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.returnBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (book.borrowedBy.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized to return this book' });
      book.available = true;
      book.borrowedBy = null;
      await book.save();
      res.json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
