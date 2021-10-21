// this file sets up our express server and a route
// index.js is where our bot logic actually lives

const express = require('express');

const server = express();

server.all('/', (req, res) => {
  res.send('Bot is running!');
});

function keepAlive() {
  server.listen(3000, () => {
    console.log('Server is ready.');
  });
}

module.exports = keepAlive;
