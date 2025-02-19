const zoomRepository = require('../Repository/zoomRepository')


const createGroup = async(req, res) => {
    return zoomRepository.createGroup(req, res);
};

module.exports = {
    createGroup,
}