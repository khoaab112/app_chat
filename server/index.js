const express = require('express');
const http = require("http");
const helmet = require('helmet');
const app = express();

const connectDB = require('./config/database.js')
const connectREDIS = require('./config/redis.js');
const log = require("./config/logger.js");
const routes = require('./src/Routes/index.js')
const { initializeSocket } = require('./src/Sockets/sockets.js')

const server = http.createServer(app);
const PORT = process.env.PORT_SERVER;
const URL = process.env.URL_SERVER;

log();
connectDB();
initializeSocket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(routes);


server.listen(PORT, () => {
    console.log(`run 💕💕💕 : ${URL}:${PORT}`);
})