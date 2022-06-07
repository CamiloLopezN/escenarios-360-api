const mongoose = require('../config/config.database');
const {Marker} = require('../models/entity.model');
const {authorize} = require("../middlewares/oauth/authentication");

const getMarkers = async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const projection = {
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    };
    let markers;
    try {
        markers = await Marker.paginate({}, {projection, limit, page});
        if (!markers) return res.status(404).json({message: 'Resource not found'});
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: 'Incomplete or bad formatted client data'});
        return res.status(500).json({message: 'Internal server error'});
    }
    return res.status(200).json({message: markers});
}
module.exports.getMarkers = [authorize([true]), getMarkers];


const postMarker = async (req, res) => {
    const {markerId, longitude, latitude, image, width, height, anchor, tooltip, content, data} = req.body;
    const marker = new Marker({
        markerId, longitude, latitude, image, width, height, anchor, tooltip, content, data
    });

    try {
        const foundMarker = await Marker.findOne({markerId});
        if (!foundMarker) {
            await marker.save();
        }
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: 'Incomplete or bad formatted marked data', errors: err.errors});
        return res.status(500).json({message: 'Internal server error'});
    }
    return res.status(200).json({message: 'Successful operation'});
}
module.exports.postMarker = [authorize([true]), postMarker];
