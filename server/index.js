const express = require('express');
const connectDB = require('./config/database.js')
const routes = require('./src/Routes/index.js')
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const PORT = process.env.PORT_SERVER;
const URL = process.env.URL_SERVER;

app.use(cors());
app.use(routes);
app.use(helmet());
app.use(express.json());

connectDB();
app.listen(PORT, () => {
    console.log(`run 💕💕💕 : ${URL}:${PORT}`);
})