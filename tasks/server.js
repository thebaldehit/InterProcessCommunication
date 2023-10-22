'use strict';

const net = require('node:net');

const task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
const results = [];
const sockets = [];

const server = net.createServer((socket) => {
  console.log('Client connected');
  sockets.push(socket);
  if (sockets.length === 4) {
    const taskNumberForOne = Math.round(task.length / 4);
    let from = 0;
    let to = taskNumberForOne
    for (const socket of sockets) {
      const message = { task: task.slice(from, to) };
      socket.write(JSON.stringify(message));
      from = to;
      to += taskNumberForOne;
      if (to >= task.length) to = task.length;
    }
  }

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
    const idx = sockets.indexOf(socket);
    sockets.splice(idx, 1);
  })
});

server.listen(2000);
