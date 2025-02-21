const zoomRepository = require('../Repository/zoomRepository')


const createGroup = async(req, res) => {
    return zoomRepository.createGroup(req, res);
};
const createZoom = async(req, res) => {
    return zoomRepository.createZoom(req, res);
};
module.exports = {
    createGroup,
    createZoom
}