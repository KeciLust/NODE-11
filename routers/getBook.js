const express = require("express");
const router = express.Router();
const Book = require("../models/books");

// URL сервиса счетчиков (из переменной окружения или localhost)
const COUNTER_SERVICE_URL = process.env.COUNTER_SERVICE_URL || "http://localhost:3001";

// Функция для увеличения счетчика
async function incrementCounter(bookId) {
  try {
    const response = await fetch(`${COUNTER_SERVICE_URL}/counter/${bookId}/incr`, {
      method: "POST",
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Ошибка при увеличении счетчика:", error.message);
  }
  return null;
}

// Функция для получения счетчика
async function getCounter(bookId) {
  try {
    const response = await fetch(`${COUNTER_SERVICE_URL}/counter/${bookId}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Ошибка при получении счетчика:", error.message);
  }
  return { bookId, counter: 0 };
}

router.get("/books/update/:id", async (req, res) => {
  const { id } = req.params;
  const foundBook = await Book.findOne({ id }).select("-__v");

  if (foundBook) {
    res.render("update", { book: foundBook });
  } else {
    res.status(404).send("Книга не найдена");
  }
});


router.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  const bookById = await Book.findOne({ id }).select("-__v");
  
  if (bookById) {
    // Увеличиваем счетчик просмотров
    await incrementCounter(id);
    
    // Получаем текущее значение счетчика
    const counterData = await getCounter(id);
    
    if (req.accepts("html")) {
      res.render("view", { 
        book: bookById,
        viewCount: counterData.counter
      });
    } else {
      res.json({
        ...bookById.toObject(),
        viewCount: counterData.counter
      });
    }
  } else {
    if (req.accepts("html")) {
      res.status(404).send("Книга не найдена");
    } else {
      res.status(404).json({ message: `Книга не найдена` });
    }
  }
});

module.exports = router;
