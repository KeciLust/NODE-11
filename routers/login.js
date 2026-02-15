const express = require("express");
const router = express.Router();

const login = { id: 1, mail: "test@mail.ru" };

router.post("/user/login", (req, res) => {
  res.status(201);
  res.json(login);
});

module.exports = router;
