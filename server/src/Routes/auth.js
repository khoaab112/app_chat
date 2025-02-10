function routerAuth(router) {
    router.get('/', (req, res) => {
        res.send('Hello World!');
    })
}

module.exports = routerAuth; // Xuất function demo