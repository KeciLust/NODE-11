const express = require("express");
const router = express.Router();
const Book = require("../models/books");
const fileMulter = require("../middleware/file");
const { v4: uuid } = require("uuid");

router.get("/books/create", (req, res) => {
  res.render("create");
});

router.post("/books/create", fileMulter.single("fileBook"), async (req, res) => {
  const { title, description, authors, favorite, fileName, fileCover } =
    req.body;
  
  let fileBook = "";
  if (req.file) {
    const { path } = req.file;
    const normalizedPath = path.replace(/\\/g, "/").replace("public/", "");
    fileBook = normalizedPath;
  }
  
  const newBook = new Book({
    id: uuid(),
    title,
    description,
    authors,
    favorite,
    fileName,
    fileCover,
    fileBook
  });
  
 try{
  await newBook.save();
  res.redirect(`/api/books/${newBook.id}`);
 }catch (error) {
    console.error("Ошибка при создании книги:", error);
    res.status(500).json({
      error: "Ошибка при создании книги",
      details: error.message
    });
  }
 
});




module.exports = router;
