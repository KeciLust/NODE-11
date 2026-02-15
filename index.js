const express = require("express");
const path = require("path");

// middleware
const logger = require("./middleware/logger");

// routes
const loginRouter = require("./routers/login");
const getBooksRouter = require("./routers/getBooks");
const getBookRouter = require("./routers/getBook");
const postBookRouter = require("./routers/postBook");
const putBookRouter = require("./routers/putBook");
const deleteBookRouter = require("./routers/deleteBook");
const getBookDownLoadRouter = require("./routers/getBookDownLoad");

const app = express();

// Настройка EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(logger);

// Главная страница - редирект на книги
app.get("/", (req, res) => {
  res.redirect("/api/books");
});


app.use("/api", loginRouter);
app.use("/api", getBooksRouter);
app.use("/api", deleteBookRouter);
app.use("/api", putBookRouter);
app.use("/api", getBookRouter);
app.use("/api", postBookRouter);
app.use("/api", getBookDownLoadRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log(`Интерфейс доступен на http://localhost:${PORT}/api/books`);
});
