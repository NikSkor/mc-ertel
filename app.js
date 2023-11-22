const path = require('path');
const bodyParser = require('body-parser');
const fileHandler = require('./modules/fileHandler');
const dataBaseName = 'dataBase';
const fs = require('fs');

const express = require('express');
const app = express();
const port = 3030;

fileHandler.createDataFile(dataBaseName);

app.set('view engine', 'ejs'); //подключаем отображение шаблонов
app.set('views', './pages'); // папка с шаблонами страниц
app.use(express.static(path.join(__dirname + '/public'))); // делаем папку доступной

app.use(bodyParser.json()); //парсер html
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user_input', function (req, res, next) { // получаем данные из формы ввода данных
  
  fileHandler.editDataFile(dataBaseName, req.body);
  res.redirect('/info'); 
});



app.get('/user/:id', function(req, res) { // получаем id пользователя
  let dataObj = {};
  let resultObj = {};
  fs.readFile(`dataBase/${dataBaseName}.json`, 'utf8', (err, data) => { // находим в файле данных пользователя по id
    dataObj = JSON.parse(data);
    dataObj.users.forEach((user) => {
      if (user.id === req.params.id) {
        resultObj = { id: user.id, ...user.content };
      }
    });

    res.render('editPage', { user: resultObj }); // рендерим страницу с данными пользователя

    app.post('/userEdit', function (req, res, next) { // получаем данные из формы редактирования
      fileHandler.updateDataFile(req.body.id, dataBaseName, req.body); // редактируем данные в файле данных
      res.redirect('/info');
    });
  });
});



app.get('/', (req, res) => { // загрузка главной страницы
  fileHandler.createDataFile(dataBaseName);

  fs.readFile(`dataBase/${dataBaseName}.json`, 'utf8', (err, data) => {
    let dataBaseFile = {};
    dataBaseFile = JSON.parse(data);

    res.render('index', { data: dataBaseFile }); //отображаем список пользователей на странице
  });
});


app.get('/info', (req, res) => { // загрузка вспомогательной страницы
  res.render('modalPage');
});

app.listen(port, () => { // статус сервера
  console.log(`Сервер запущен на http://localhost:${port}`);
});
