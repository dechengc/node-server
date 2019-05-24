const express = require('express');
const app = express();
const port = 8765;
const bodyParser = require('body-parser');

app.use(express.json());

app.get('/', (request, response) => {
  response.send('Hello from express!');
})

app.post('/checkBirthday', (request, response) => {
  //console.log(request.body);
  let today = new Date();
  let month, date, year;
  if (request.body && request.body.birthday) {
    month = request.body.birthday.month;
    date = request.body.birthday.date;
    year = today.getFullYear();
  } else {
    response.status(400).send({
      message: 'Please provide birthday.'
    });
    return;
  }
  if (request.body && !request.body.name) {
    response.status(400).send({
      message: 'Please provide name.'
    });
    return;
  }

  let validateDate = (month, date) => {

    var monthLength = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Check the range of the day
    return date > 0 && date <= monthLength[month - 1];
  };
  if (!validateDate(month, date)) {
    response.status(400).send({
      message: 'Invalid birthday date input.'
    });
    return;
  }
  if (month == today.getMonth() && date == today.getDate()) {
    response.send('Hello ' + request.body.name.first + '. Happy birthday!');
    return;
  }
  if (month == 2 && date == 29) {
    if (!((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) || (month < today.getMonth() || month == today.getMonth() && date < today.getDate())) {
      while (!((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)) {
        year++;
      }
    }
  } else if (month < today.getMonth() || month == today.getMonth() && date < today.getDate()) {
    year++;
  }
  //console.log(year);
  let birthday = new Date(year, month - 1, date);
  let delta = Math.round((birthday - today) / (1000 * 60 * 60 * 24));
  response.send('Hello ' + request.body.name.first + '. You have ' + delta + ' days until your birthday!');
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
