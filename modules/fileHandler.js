const fs = require('fs');
const generateRandomId = require('./utils/generateRandomId');
const formatFate = require('./utils/formatDate');


exports.createDataFile = (name) => {
  fs.access(`dataBase/${name}.json`, (err) => {
    if (err) {
      console.log('Файл данных не найден');
      fs.writeFile(`dataBase/${name}.json`, '{"users":[]}', () => {});
    } else {
      console.log('Файл данных функционирует');
    }
  });
};

exports.getDataFile = (name) => {
  let dataObj = {};
  fs.readFile(`dataBase/${name}.json`, 'utf8', (err, data) => {
    dataObj = JSON.parse(data);

  });

  return dataObj;
}

exports.editDataFile = (name, data) => {
  this.createDataFile(name);
  let dataObj = {};
  let nowDate = new Date();
  dataObj.id = generateRandomId.generateRandomId();
  dataObj.content = {...data};
  dataObj.content.date = formatFate.formatDate(nowDate);
  dataObj.content.editDate = 'изменений не было';

  let dataOldObj = {};

  fs.readFile(`dataBase/${name}.json`, 'utf8', (err, dataOld) => {
    dataOldObj = JSON.parse(dataOld);

    dataOldObj.users.push(dataObj);


    fs.writeFile(`dataBase/${name}.json`, JSON.stringify(dataOldObj), () => {});
  });
}