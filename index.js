const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory data store
let books = [
    { id: 1, title: '1984', author: 'George Orwell', year: 1949 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
];

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// GET /books/:id - Retrieve a book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    const newBook = { id: books.length + 1, title, author, year };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const { title, author, year } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    if (year) book.year = year;

    res.status(200).json(book);
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

    books.splice(bookIndex, 1);
    res.status(204).send();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
