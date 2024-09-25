const express = require('express');
const { createBook, getBookById, getBooks, updateBook, deleteBook, borrowBook, returnBook } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getBooks).post(authMiddleware, createBook);
router.route('/:id').put(authMiddleware, updateBook).delete(authMiddleware, deleteBook);
router.put('/borrow/:id', authMiddleware, borrowBook);
router.put('/return/:id', authMiddleware, returnBook);
router.get('/:id', getBookById);


module.exports = router;
