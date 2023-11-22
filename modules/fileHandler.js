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

exports.editDataFile = (name, data) => {
  this.createDataFile(name);
  let dataObj = {};
  let nowDate = new Date();
  dataObj.id = generateRandomId.generateRandomId();
  dataObj.content = {...data};
  dataObj.content.date = formatFate.formatDate(nowDate);

  dataObj.content.editDate = 'нет изменений';

  let dataOldObj = {};

  fs.readFile(`dataBase/${name}.json`, 'utf8', (err, dataOld) => {
    dataOldObj = JSON.parse(dataOld);

    dataOldObj.users.push(dataObj);


    fs.writeFile(`dataBase/${name}.json`, JSON.stringify(dataOldObj), () => {});
  });
}

exports.updateDataFile = (id, name, userData) => {
  this.createDataFile(name);
  fs.readFile(`dataBase/${name}.json`, 'utf8', (err, dataOld) => {
    let dataObj = JSON.parse(dataOld);
    let nowDate = new Date();

    dataObj.users.forEach((user) => {
      if(user.id === id) {
        user.content = {
          name: userData.name,
          mail: userData.mail,
          date: user.content.date,
          editDate: formatFate.formatDate(nowDate)
        }
      }
    })

    fs.writeFile(`dataBase/${name}.json`, JSON.stringify(dataObj), () => {});
  });
}

exports.searchInFile = (id, name) => {
  let dataObj = {};
  let resultObj = {};
  fs.readFile(`dataBase/${name}.json`, 'utf8', (err, data) => {
    dataObj = JSON.parse(data);

    dataObj.users.forEach(user => {
      if(user.id === id) {
        resultObj = {id: user.id, ...user.content}
      }
    });
    
  });

  console.log('resultObj: ', resultObj);

  return resultObj;
}