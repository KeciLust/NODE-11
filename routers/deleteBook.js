const express = require("express");
const router = express.Router();
const stor = require("../public/books/storage");


router.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const { book } = stor;
  const bookIndex = book.findIndex((el) => el.id === id);
  if (bookIndex !== -1) {
    book.splice(bookIndex, 1);
    res.json("OK");
  } else {
    res.status(404).json({ message: "Книга не найдена" });
  }
});


router.get("/books/delete/:id", (req, res) => {
  const { id } = req.params;
  const { book } = stor;
  const bookIndex = book.findIndex((el) => el.id === id);
  
  if (bookIndex !== -1) {
    book.splice(bookIndex, 1);
    res.redirect("/api/books");
  } else {
    res.status(404).send("Книга не найдена");
  }
});


router.post("/books/delete/:id", (req, res) => {
  const { id } = req.params;
  const { book } = stor;
  const bookIndex = book.findIndex((el) => el.id === id);
  
  if (bookIndex !== -1) {
    book.splice(bookIndex, 1);
    res.redirect("/api/books");
  } else {
    res.status(404).send("Книга не найдена");
  }
});

module.exports = router;
