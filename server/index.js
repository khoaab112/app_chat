const express = require('express');
const connectDB = require('./config/database.js')
const connectREDIS = require('./config/redis.js');
const log = require("./config/logger.js");
const routes = require('./src/Routes/index.js')
const helmet = require('helmet');
const app = express();

const PORT = process.env.PORT_SERVER;
const URL = process.env.URL_SERVER;
connectDB();
log();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(routes);

app.listen(PORT, () => {
    console.log(`run 💕💕💕 : ${URL}:${PORT}`);
})