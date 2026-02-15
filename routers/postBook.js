const express = require("express");
const router = express.Router();
const stor = require("../public/books/storage");
const Book = require("../models/Book");
const fileMulter = require("../middleware/file");
const { v4: uuid } = require("uuid");

router.post("/books/create", fileMulter.single("fileBook"), (req, res) => {
  const { book } = stor;
  const { title, description, authors, favorite, fileName, fileCover } =
    req.body;
  
  let fileBook = "";
  if (req.file) {
    const { path } = req.file;
    const normalizedPath = path.replace(/\\/g, "/").replace("public/", "");
    fileBook = normalizedPath;
  }
  
  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileName,
    fileCover,
    fileBook,
    uuid()
  );
  
  book.push(newBook);
  
  // Если запрос от формы - редирект на страницу книги
  if (req.accepts("html")) {
    res.redirect(`/api/books/${newBook.id}`);
  } else {
    res.json(newBook);
  }
});


router.post("/books", fileMulter.single("fileBook"), (req, res) => {
  const { book } = stor;
  const { title, description, authors, favorite, fileName, fileCover } =
    req.body;
  
  let fileBook = "";
  if (req.file) {
    const { path } = req.file;
    const normalizedPath = path.replace(/\\/g, "/").replace("public/", "");
    fileBook = normalizedPath;
  }
  
  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileName,
    fileCover,
    fileBook,
    uuid()
  );
  
  book.push(newBook);
  res.json(newBook);
});

module.exports = router;
