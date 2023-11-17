const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();
const port = 3030;

app.set('view engine', 'ejs');
app.set('views', './pages');
app.use(express.static('public'));
app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
