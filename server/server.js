require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к MySQL:", err);
    return;
  }
  console.log("Подключено к MySQL");
});


app.post("/api/transactions", (req, res) => {
  console.log("Received data:", req.body);
  const { dateTime, author, sum, category, comment } = req.body;
  const sql = "INSERT INTO transactions (dateTime, author, sum, category, comment) VALUES (?, ?, ?, ?, ?)";
  
  db.query(sql, [dateTime, author, sum, category, comment], (err, result) => {
    if (err) {
      console.error("Ошибка добавления данных:", err);  // Логирование ошибки
      return res.status(500).send(`Ошибка сервера: ${err.message}`);
    } else {
      res.status(201).send("Расход успешно добавлен");
    }
  });
});


app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
