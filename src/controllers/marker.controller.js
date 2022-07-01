const mongoose = require('../config/config.database');
const {Marker} = require('../models/entity.model');
const {authorize} = require("../middlewares/oauth/authentication");
const {STATUS_400, STATUS_500, STATUS_200, STATUS_404} = require("../utils/constants");


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
            return res.status(400).json({message: STATUS_400, errors: err.errors});
        return res.status(500).json({message: STATUS_500});
    }
    return res.status(200).json({message: STATUS_200});
}
module.exports.postMarker = [authorize(), postMarker];

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
        if (!markers) return res.status(404).json({message: STATUS_404});
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: STATUS_400});
        return res.status(500).json({message: STATUS_500});
    }
    return res.status(200).json({message: markers});
}
module.exports.getMarkers = [authorize(), getMarkers];


const getMarkerById = async (req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
        const doc = await Marker.findOne({id: id})
        if (!doc) return res.status(404).json({message: STATUS_404});
        return res.status(200).json({message: doc});
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError)
            return res.status(400).json({message: STATUS_400});
        return res.status(500).json({message: STATUS_500});
    }
}
module.exports.getMarkerById = [authorize(), getMarkerById];

