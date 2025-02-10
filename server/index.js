const express = require('express');
const connectDB = require('./config/database.js')
const routes = require('./src/Routes/index.js')
const cors = require('cors');
const helmet = require('helmet');


const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

connectDB();

const PORT = process.env.PORT_SERVER;
const URL = process.env.URL_SERVER;
routes(app);
app.listen(PORT, () => {

    console.log(`RUN ip: ${URL}:${PORT}`);
})