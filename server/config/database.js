const { DB_HOST } = process.env;
const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(`${DB_HOST}`, {});
        console.log('MongoDB Connected!');
    } catch (error) {
        console.error('Connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;