'use strict';

const net = require('node:net');

const caltulations = (item) => item * 2;

const socket = new net.Socket();

const client = socket.connect({
  port: 2000,
  host: '127.0.0.1'
});

client.on('data', (data) => {
  const message = JSON.parse(data);
  const task = message.task;
  console.log(task);
  if (!task) return client.end();
  const result = task.map(caltulations);
  client.write(JSON.stringify({ result, from: message.from }));
});
