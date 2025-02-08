const express = require('express')
const app = express()
const PORT = process.env.PORT_SERVER
const URL = process.env.URL_SERVER

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`RUN ip: ${URL}:${PORT}`)
})