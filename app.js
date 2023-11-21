const path = require('path');
const bodyParser = require('body-parser');
const fileHandler = require('./modules/fileHandler');
const dataBaseName = 'dataBase';
const fs = require('fs');

const express = require('express');
const app = express();
const port = 3030;

fileHandler.createDataFile(dataBaseName);

// fileHandler.getDataFile(dataBaseName);




app.set('view engine', 'ejs');
app.set('views', './pages');
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname + '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user_input', function (req, res, next) {
  // Объект req.body содержит данные из переданной формы
  console.log(req.body);
  fileHandler.editDataFile(dataBaseName, req.body);
  res.redirect('/info');
});

app.post('/edit', function (req, res, next) {
  // Объект req.body содержит данные из переданной формы
  console.log(req.body);
  // fileHandler.editDataFile(dataBaseName, req.body);
  // res.redirect('/info');
});

app.get('/', (req, res) => {
  fs.readFile(`dataBase/${dataBaseName}.json`, 'utf8', (err, data) => {
    let dataBaseFile = {};
    dataBaseFile = JSON.parse(data);

    res.render('index', { data: dataBaseFile });
  });
});


app.get('/info', (req, res) => {
  res.render('modalPage');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
