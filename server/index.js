const express = require('express');
const connectDB = require('./config/database.js')
const routes = require('./src/Routes/index.js')
const helmet = require('helmet');
const app = express();

const PORT = process.env.PORT_SERVER;
const URL = process.env.URL_SERVER;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(helmet());

app.listen(PORT, () => {
    console.log(`run 💕💕💕 : ${URL}:${PORT}`);
})