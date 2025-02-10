const auth = require('./auth')

const index = (app) => {
    console.log(11);
    auth(app);
}
module.exports = index;