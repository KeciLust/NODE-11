const express = require("express");
const router = express.Router();
const Book = require("../models/books");


router.get("/books", async (req, res) => {
  try {
    const books = await Book.find().select("-__v");
    res.render("index", {
      books
    });
  } catch (error) {
    res.status(500).json({
      error: "Ошибка при получении книг"
    });
  }
});

module.exports = router;