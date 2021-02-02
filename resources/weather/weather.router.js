const router = require('express').Router();
const https = require('https');
var request = require('request');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');
const json2csv = require('json2csv');

const { Parser, transforms: { unwind } } = require('json2csv');
const { transforms, fields } = require('../../utils/csv_convert');

router.get('/', (req, res) => {
  res.render('weather');
});

const http = require("https");
const { Data } = require('../data/data.model');
const parser = new Parser({ fields, transforms, withBOM: true,  excelStrings: true});

router.get('/get', async (req, res) => {

  const data = [
    JSON.parse(await getPromise(55.7539, 37.620393)),
    JSON.parse(await getPromise(59.9311, 30.3609)),
    JSON.parse(await getPromise(54.9833, 82.8964)),
    JSON.parse(await getPromise(56.8431, 60.6454)),
    JSON.parse(await getPromise(55.7879, 49.1233)),
  ];

  if (data) {
    Data.create({ time: Date.now(), login: req.cookies.login, weatherData: data });
    sendFile(data, res);
  } else {
    res.send(304);
  }
});

router.get('/history', async (req, res) => {
  const data = await Data.find({});
  const tableData = [];

  data.forEach((item) => {
    tableData.push({
      time: item.time,
      login: item.login,
      id: item.id,
    });
  });
  res.render('showWeather', { history: JSON.stringify(tableData) });
});

router.get('/history/download', async (req, res) => {
  const dataObjArr = await Data.findById(req.query.id);
  const data = dataObjArr.weatherData.map((item) => item);

  sendFile(data, res);
});

function sendFile(data, res) {
  let csv = '';
  data.forEach((item) => {
    csv += parser.parse(item) + '\n';
  });

  res.header('Content-Type', 'text/csv');
  res.attachment(`data_${data[0].now || data[0].time}.csv`);

  return res.send(csv.toString("utf8"));
}

function getPromise(lat, lon) {
  return new Promise((resolve, reject) => {
    var options = {
      " ": "GET",
      "hostname": "api.weather.yandex.ru",
      "port": null,
      "path": `/v2/forecast?lat=${lat}&lon=${lon}&extra=true`,
      "headers": {
        "x-yandex-api-key": "6c939b5a-7ff6-4ff2-a056-dd40d3c297c4",
        "cache-control": "no-cache",
        "postman-token": "24de77ef-d19b-02a1-5b21-1bd97dd259c2"
      }
    };
    
    req = http.request(options, async function (res) {
      let chunks = [];
    
      res.on('data', function (chunk) {
        chunks.push(chunk);
      });
    
      res.on('end', function () {
        let body = Buffer.concat(chunks);
        resolve(body.toString());
      });

      res.on('error', (error) => {
				reject(error);
			});
    });
  
    req.end();
  });
}

module.exports = router;