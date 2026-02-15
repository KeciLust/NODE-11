const express = require("express");
const path = require("path");
const mongoose = require("mongoose");


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
app.use("/api", postBookRouter);
app.use("/api", putBookRouter);
app.use("/api", deleteBookRouter);
app.use("/api", getBookDownLoadRouter);
app.use("/api", getBookRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.ME_CONFIG_MONGODB_URL || "mongodb://root:example@mongo:27017/";

async function start(PORT, MONGO_URI) {

  try{

    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
      console.log(`Интерфейс доступен на http://localhost`);
    });
  }catch (error) {
    console.error("Ошибка при подключении к MongoDB:", error);
    process.exit(1);
  }
}
start(PORT, MONGO_URI);
