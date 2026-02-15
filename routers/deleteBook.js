const express = require("express");
const router = express.Router();
const Book = require("../models/books");


router.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOneAndDelete({ id });
    
    if (book) {
      res.json("OK");
    } else {
      res.status(404).json({ message: "Книга не найдена" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении книги" });
  }
});


router.get("/books/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOneAndDelete({ id });
    
    if (book) {
      res.redirect("/api/books");
    } else {
      res.status(404).send("Книга не найдена");
    }
  } catch (error) {
    res.status(500).send("Ошибка при удалении книги");
  }
});


router.post("/books/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOneAndDelete({ id });
    
    if (book) {
      res.redirect("/api/books");
    } else {
      res.status(404).send("Книга не найдена");
    }
  } catch (error) {
    res.status(500).send("Ошибка при удалении книги");
  }
});

module.exports = router;
