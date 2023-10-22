'use strict';

const net = require('node:net');

const task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
const results = [];

const server = net.createServer((socket) => {
  console.log('Client connected');
  const message = { task };
  socket.write(JSON.stringify(message));
  socket.on('data', (data) => {
    const message = JSON.parse(data);
    console.log(message.result);
    results.push(message.result);

    if (results.length === 4) {
      process.exit(0);
    }
  });
  socket.on('end', () => {
    console.log('Client disconected');
  })
});

server.listen(2000);
