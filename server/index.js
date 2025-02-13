const express = require('express');
const connectDB = require('./config/database.js')
const connectREDIS = require('./config/redis.js');
const routes = require('./src/Routes/index.js')
const helmet = require('helmet');
const app = express();

const PORT = process.env.PORT_SERVER;
const URL = process.env.URL_SERVER;
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());



app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ status: 400, message: "Invalid JSON format" });
    }
    next();
});

app.use(routes);

app.listen(PORT, () => {
    console.log(`run 💕💕💕 : ${URL}:${PORT}`);
})