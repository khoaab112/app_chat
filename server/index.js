const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');


const PORT = process.env.PORT_SERVER;
const URL = process.env.URL_SERVER;
const { DB_HOST, DB_NAME } = process.env;
const client = new MongoClient(DB_HOST);
const dbName = DB_NAME;

async function main() {
    // Use connect method to connect to the server
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('documents');
    } catch (error) {
        console.log(error)
    }


    // the following code examples can be pasted here...

    return 'done.';
}

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(PORT, () => {

    main()
        .then(console.log(33))
        .catch(console.error(234234))
        .finally(() => client.close());
    console.log(`RUN ip: ${URL}:${PORT}`);
})