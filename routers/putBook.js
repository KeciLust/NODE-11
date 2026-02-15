const express = require("express");
const router = express.Router();
const stor = require("../public/books/storage");

// PUT для API
router.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { book } = stor;
  const bookIndex = book.findIndex((el) => el.id === id);
  if (bookIndex !== -1) {
    const { title, description, authors, favorite, fileName, fileCover } = req.body;
    book[bookIndex] = {
      ...book[bookIndex],
      title,
      description,
      authors,
      favorite,
      fileName,
      fileCover,
    };
    res.json(book[bookIndex]);
  } else {
    res.status(404).json({ message: "Книга не найдена" });
  }
});

// POST для HTML формы 
router.post("/books/update/:id", (req, res) => {
  const { id } = req.params;
  const { book } = stor;
  const bookIndex = book.findIndex((el) => el.id === id);
  
  if (bookIndex !== -1) {
    const { title, description, authors, favorite, fileName, fileCover } = req.body;
    book[bookIndex] = {
      ...book[bookIndex],
      title,
      description,
      authors,
      favorite: favorite || false,
      fileName,
      fileCover,
    };
    
    // Редирект на страницу просмотра книги
    res.redirect(`/api/books/${id}`);
  } else {
    res.status(404).send("Книга не найдена");
  }
});

module.exports = router;
