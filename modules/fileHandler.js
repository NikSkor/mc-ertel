const fs = require('fs');
const generateRandomId = require('./utils/generateRandomId');
const formatFate = require('./utils/formatDate');


exports.fileCreator = (name) => {
  fs.access(`dataBase/${name}.json`, (err) => {
    if (err) {
      console.log('Файл данных не найден');
      fs.writeFile(`dataBase/${name}.json`, '{"users":[]}', () => {});
    } else {
      console.log('Файл данных функционирует');
    }
  });
};

exports.fileEditor = (name, data) => {
  this.fileCreator(name);
  let dataObj = {};
  let nowDate = new Date();
  dataObj.id = generateRandomId.generateRandomId();
  dataObj.content = {...data};
  dataObj.content.date = formatFate.formatDate(nowDate);
  dataObj.content.editDate = 'не изменялся';
  console.log('dataObj: ', dataObj);
  let dataOldObj = {};

  fs.readFile(`dataBase/${name}.json`, 'utf8', (err, dataOld) => {
    dataOldObj = JSON.parse(dataOld);

    dataOldObj.users.push(dataObj);

    console.log('dataOldObj: ', dataOldObj);
    fs.writeFile(`dataBase/${name}.json`, JSON.stringify(dataOldObj), () => {});
  });
}