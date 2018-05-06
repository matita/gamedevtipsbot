// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/discord', (req, res) => {
  res.send('<a href="https://discordapp.com/oauth2/authorize?scope=bot&client_id=' + process.env.DISCORD_CLIENT_ID + '">Invite bot to server</a>')
})

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

app.get('/tips.db', (req, res) => {
  const path = require('path')
  const tipsPath = path.resolve(__dirname, '../../.data/tips.db')
  const fs = require('fs')
  fs.readFile(tipsPath, (err, data) => {
    res.send('' + data)
  })
})

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// live forever
const http = require('http')
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
