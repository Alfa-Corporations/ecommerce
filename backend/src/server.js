const app = require("./app");
const swaggerDocs = require("../swagger");
require("dotenv").config();
const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 8000;
const rawHost = process.env.HOST || "localhost";
const host = rawHost.replace(/\/+$/g, "");
const hostUrl = host.match(/^https?:\/\//i) ? host : `http://${host}`;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT']
  }
});

// Expose io to routes/controllers via app
app.set('io', io);

io.on('connection', (socket) => {
  console.log('New socket connected', socket.id);
  socket.on('disconnect', () => console.log('Socket disconnected', socket.id));
});

server.listen(PORT, () => {
  console.log(`Run server in ${hostUrl}:${PORT}`);
  swaggerDocs(app, PORT);
});
