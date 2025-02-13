const client = require("./../../config/redis");

async function getRedis(key) {
    return await client.get(key);
};
const setRedisForType = async(key, data, type, exp = null) => {
    let string = type === 'str' ? data : JSON.stringify(data);
    await client.set(key, string);
    if (exp) // Second 
        await client.expire(key, exp);
};
const destroyRedis = async(key) => {
    await client.del(key);
}

module.exports = {
    getRedis,
    setRedisForType,
    destroyRedis
};