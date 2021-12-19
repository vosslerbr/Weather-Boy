// this file sets up our express server and a route
// index.js is where our bot logic actually lives

const express = require('express');

const server = express();

server.all('/', (req, res) => {
  res.send('Bot is running!');
});

var port = process.env.PORT || '3000';

function keepAlive() {
  server.listen(port, () => {
    console.log('Server is ready.');
  });
}

module.exports = keepAlive;
