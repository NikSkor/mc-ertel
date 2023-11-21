const path = require('path');
const bodyParser = require('body-parser');
const fileHandler = require('./modules/fileHandler');
const dataBaseName = 'dataBase';
const fs = require('fs');

const express = require('express');
const app = express();
const port = 3030;

fileHandler.createDataFile(dataBaseName);

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



app.get('/user/:id', function(req, res) {
  const id = req.params.id;
  // console.log('id: ', id);

  // let userData = fileHandler.searchInFile(id, dataBaseName);
  let dataObj = {};
  let resultObj = {};
  fs.readFile(`dataBase/${dataBaseName}.json`, 'utf8', (err, data) => {
    dataObj = JSON.parse(data);

    dataObj.users.forEach((user) => {
      if (user.id === id) {
        resultObj = { id: user.id, ...user.content };
      }
    });
    console.log('resultObj: ', resultObj);
    res.render('editPage', { user: resultObj });
  });

  app.post('/userEdit', function (req, res, next) {
    // Объект req.body содержит данные из переданной формы
    console.log(req.body);
    fileHandler.updateDataFile(id, dataBaseName, req.body);
      res.redirect('/info');
  });
});

app.get('/', (req, res) => {
  fileHandler.createDataFile(dataBaseName);

  fs.readFile(`dataBase/${dataBaseName}.json`, 'utf8', (err, data) => {
    let dataBaseFile = {};
    dataBaseFile = JSON.parse(data);

    res.render('index', { data: dataBaseFile });
  });
});


app.get('/info', (req, res) => {
  res.render('modalPage');
});

// app.get('/edit', (req, res) => {
//   res.render('editPage');
// });

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
