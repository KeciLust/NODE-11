const express = require("express");
const router = express.Router();
const Book = require("../models/books");

router.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, authors, favorite, fileName, fileCover } = req.body;
    
    const book = await Book.findOneAndUpdate(
      { id },
      { title, description, authors, favorite, fileName, fileCover },
      { new: true }
    ).select("-__v");
    
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Книга не найдена" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении книги" });
  }
});

router.post("/books/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, authors, favorite, fileName, fileCover } = req.body;
    
    const book = await Book.findOneAndUpdate(
      { id },
      { title, description, authors, favorite: favorite || false, fileName, fileCover },
      { new: true }
    );
    
    if (book) {
      res.redirect(`/api/books/${id}`);
    } else {
      res.status(404).send("Книга не найдена");
    }
  } catch (error) {
    res.status(500).send("Ошибка при обновлении книги");
  }
});

module.exports = router;
