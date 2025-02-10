const { DB_HOST, DB_NAME } = process.env;
const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(`${DB_HOST}/${DB_NAME}`, {});
        console.log('MongoDB Connected!');
    } catch (error) {
        console.error('Connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;