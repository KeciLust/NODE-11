const express = require("express");
const router = express.Router();
const stor = require("../public/books/storage");


router.get("/books", (req, res) => {
  const { book } = stor;
  

  if (req.accepts("html")) {
    res.render("index", { books: book });
  } else {

    res.json(book);
  }
});


router.get("/books/create", (req, res) => {
  res.render("create");
});

module.exports = router;
