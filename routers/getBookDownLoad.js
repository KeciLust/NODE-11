const express = require("express");
const router = express.Router();
const stor = require("../public/books/storage");
const path = require("path");
const fs = require("fs");

router.get("/books/:id/download", (req, res) => {
  const { id } = req.params;
  const { book } = stor;
  const bookById = book.findIndex((el) => el.id === id);
  if (bookById !== -1) {
    const filePath = path.join(
      __dirname,
      "..",
      "public",
      book[bookById].fileBook
    );
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Файл книги не найден" });
    }
    const fileName = path.basename(book[bookById].fileBook);
    res.download(filePath, fileName);
  } else {
    res.status(404).json({ message: `Книга не найдена` });
  }
});

module.exports = router;
